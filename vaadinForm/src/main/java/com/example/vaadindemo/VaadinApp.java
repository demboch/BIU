package com.example.vaadindemo;

import java.util.Date;
import java.util.List;

import com.example.vaadindemo.domain.Person;
import com.example.vaadindemo.service.PersonManager;
import com.vaadin.annotations.Title;
import com.vaadin.data.Property;
import com.vaadin.data.Property.ValueChangeEvent;
import com.vaadin.data.fieldgroup.FieldGroup;
import com.vaadin.data.fieldgroup.FieldGroup.CommitException;
import com.vaadin.data.util.BeanItem;
import com.vaadin.data.util.BeanItemContainer;
import com.vaadin.data.validator.NullValidator;
import com.vaadin.server.FontAwesome;
import com.vaadin.server.VaadinRequest;
import com.vaadin.ui.Button;
import com.vaadin.ui.CssLayout;
import com.vaadin.ui.Button.ClickEvent;
import com.vaadin.ui.Button.ClickListener;
import com.vaadin.ui.themes.ValoTheme;
import com.vaadin.ui.FormLayout;
import com.vaadin.ui.Grid;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.ui.OptionGroup;
import com.vaadin.ui.Table;
import com.vaadin.ui.TextField;
import com.vaadin.ui.UI;
import com.vaadin.ui.VerticalLayout;
import com.vaadin.ui.Window;

@Title("Vaadin Demo App")
public class VaadinApp extends UI {

	private static final long serialVersionUID = 1L;

	private PersonManager personManager = new PersonManager();

	private Person person = new Person("Jasiu", new Date(), "Kowalski", "przyklad@gmail.com", "gender");
	private BeanItem<Person> personItem = new BeanItem<Person>(person);

	private BeanItemContainer<Person> persons = new BeanItemContainer<Person>(Person.class);

	private Grid grid = new Grid();
	private TextField filterText = new TextField();

	enum Action {
		EDIT, ADD;
	}

	private class MyFormWindow extends Window {
		private static final long serialVersionUID = 1L;

		private Action action;

		public MyFormWindow(Action act) {
			this.action = act;

			setModal(true);
			center();

			switch (action) {
			case ADD:
				setCaption("Dodaj nową osobę");
				break;
			case EDIT:
				setCaption("Edytuj osobę");
				break;
			default:
				break;
			}

			final FormLayout form = new FormLayout();
			final FieldGroup binder = new FieldGroup(personItem);

			final Button saveBtn = new Button(" Dodaj osobę ");
			final Button cancelBtn = new Button(" Anuluj ");

			// wyskakujące okno z wyborem daty
			// PopupDateField date = new PopupDateField("Rok urodzenia");

			form.addComponent(binder.buildAndBind("Imię", "firstName"));
			form.addComponent(binder.buildAndBind("Nazwisko", "lastName"));
			form.addComponent(binder.buildAndBind("Rok urodzenia", "yob"));
			form.addComponent(binder.buildAndBind("Email", "email"));

			OptionGroup gender = new OptionGroup("Płeć");
			gender.addItems("Kobieta", "Mężczyzna");
			binder.bind(gender, "gender");
			form.addComponent(gender);

			binder.setBuffered(true);

			binder.getField("firstName").setRequired(true);
			//filterText.setIcon(FontAwesome.USER);
			//filterText.addValidator(new NullValidator("Must be given", false));
			//form.addComponent(filterText);

			binder.getField("lastName").setRequired(true);

			binder.getField("email").setRequired(true);

			VerticalLayout fvl = new VerticalLayout();
			fvl.setMargin(true);
			fvl.addComponent(form);

			HorizontalLayout hl = new HorizontalLayout();
			hl.addComponent(saveBtn);
			hl.setSpacing(true);
			hl.addComponent(cancelBtn);
			fvl.addComponent(hl);

			setContent(fvl);

			saveBtn.addClickListener(new ClickListener() {

				private static final long serialVersionUID = 1L;

				@Override
				public void buttonClick(ClickEvent event) {
					try {
						binder.commit();
						if (action == Action.ADD && person.isValid(person.getEmail()) && person.validateFirstName(person.getFirstName()) && person.validateLastName(person.getLastName())) {
							personManager.addPerson(person);
						} else if (action == Action.EDIT && person.isValid(person.getEmail()) && person.validateFirstName(person.getFirstName()) && person.validateLastName(person.getLastName())) {
							personManager.updatePerson(person);
						}

						persons.removeAllItems();
						persons.addAll(personManager.findAll());
						close();
					} catch (CommitException e) {
						e.printStackTrace();
					}
				}
			});

			cancelBtn.addClickListener(new ClickListener() {

				private static final long serialVersionUID = 1L;

				@Override
				public void buttonClick(ClickEvent event) {
					binder.discard();
					close();
				}
			});
		}
	}

	@Override
	protected void init(VaadinRequest request) {

		Button addPersonFormBtn = new Button("Add");
		Button deletePersonFormBtn = new Button("Delete");
		Button editPersonFormBtn = new Button("Edit");

		VerticalLayout vl = new VerticalLayout();
		setContent(vl);

		addPersonFormBtn.addClickListener(new ClickListener() {

			private static final long serialVersionUID = 1L;

			@Override
			public void buttonClick(ClickEvent event) {
				addWindow(new MyFormWindow(Action.ADD));
			}
		});

		editPersonFormBtn.addClickListener(new ClickListener() {

			private static final long serialVersionUID = 1L;

			@Override
			public void buttonClick(ClickEvent event) {
				addWindow(new MyFormWindow(Action.EDIT));
			}
		});

		deletePersonFormBtn.addClickListener(new ClickListener() {

			private static final long serialVersionUID = 1L;

			@Override
			public void buttonClick(ClickEvent event) {
				if (!person.getFirstName().isEmpty()) {
					personManager.delete(person);
					persons.removeAllItems();
					persons.addAll(personManager.findAll());
				}
			}
		});

		filterText.setInputPrompt("filtruj po nazwie...");
		filterText.addTextChangeListener(e -> {
			grid.setContainerDataSource(new BeanItemContainer<>(Person.class, personManager.findAll()));
		});
		
		Button clearFilterTextBtn = new Button(FontAwesome.TIMES);
        clearFilterTextBtn.setDescription("wyczyść filtrowanie");
        clearFilterTextBtn.addClickListener(e -> {
            filterText.clear();
            updateList();
        });

        CssLayout filtering = new CssLayout();
        filtering.addComponents(filterText, clearFilterTextBtn);
        filtering.setStyleName(ValoTheme.LAYOUT_COMPONENT_GROUP);

		final Table personsTable = new Table("Persons", persons);
		personsTable.setColumnHeader("firstName", "Imię");
		personsTable.setColumnHeader("lastName", "Nazwisko");
		personsTable.setColumnHeader("yob", "Rok urodzenia");
		personsTable.setColumnHeader("email", "Email");
		personsTable.setColumnHeader("gender", "Płeć");
		personsTable.setSelectable(true);
		personsTable.setImmediate(true);

		HorizontalLayout buttons = new HorizontalLayout();
		buttons.addComponent(addPersonFormBtn);
		buttons.addComponent(editPersonFormBtn);
		buttons.addComponent(deletePersonFormBtn);

		personsTable.addValueChangeListener(new Property.ValueChangeListener() {

			private static final long serialVersionUID = 1L;

			@Override
			public void valueChange(ValueChangeEvent event) {

				Person selectedPerson = (Person) personsTable.getValue();
				if (selectedPerson == null) {
					person.setFirstName("");
					person.setLastName("");
					person.setYob(null);
					person.setGender("");
					person.setEmail("");
					person.setId(null);
				} else {
					person.setFirstName(selectedPerson.getFirstName());
					person.setLastName(selectedPerson.getLastName());
					person.setYob(selectedPerson.getYob());
					person.setGender(selectedPerson.getGender());
					person.setEmail(selectedPerson.getEmail());
					person.setId(selectedPerson.getId());
				}
			}
		});

		vl.setMargin(true);
		vl.setSpacing(true);
		buttons.setSpacing(true);
		personsTable.setSizeFull();
		vl.addComponent(filtering);
		vl.addComponents(personsTable, buttons);
		//vl.addComponent(buttons);

		// HorizontalLayout horizontalLayout = new HorizontalLayout();
		// Label label = new Label();
		// horizontalLayout.addComponent(label);
		// label.setValue(UI.getCurrent().toString());
		//
		// vl.addComponent(horizontalLayout);
	}
	
	   public void updateList() {
	        List<Person> persons = personManager.findAll();
	        grid.setContainerDataSource(new BeanItemContainer<>(Person.class, persons));
	    }

}
