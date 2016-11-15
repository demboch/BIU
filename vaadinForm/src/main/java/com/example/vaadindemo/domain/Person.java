package com.example.vaadindemo.domain;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import com.vaadin.data.Validator;
import com.vaadin.ui.Notification;
import com.vaadin.ui.TextField;

public class Person implements Validator {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private TextField textField = new TextField();

	private UUID id;

	private String firstName;

	private Date yob;
	// private SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
	// private String dateString = dateFormat.format(yob);

	private String lastName;

	private String email;

	private String gender;

	public Person(String firstName, Date yob, String lastName, String email, String gender) {
		super();
		this.firstName = firstName;
		this.yob = yob;
		this.lastName = lastName;
		this.email = email;
		this.gender = gender;
	}

	public Person() {
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public Date getYob() {
		return yob;
	}

	public void setYob(Date yob) {
		this.yob = yob;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Override
	public String toString() {
		return "Person [firstName=" + firstName + ", yob=" + yob + ", lastName=" + lastName + "]";
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public boolean isValid(Object value) {
		try {
			validate(value);
		} catch (Validator.InvalidValueException ive) {
			textField.setValidationVisible(true);
			Notification.show("Błędny email!");
			return false;
		}
		return true;
	}

	public void validate(Object value) throws Validator.InvalidValueException {
		if (value instanceof String) {
			String email = (String) value;
			if (!email.matches(
					"^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"))
				throw new Validator.InvalidValueException("Nieprawidłowy adres E-mail!!!");
		}
	}

	public boolean validateFirstName(String firstName) {
		if (firstName.matches("[A-Z][a-zA-Z]*")) {
			return true;
		} else

			textField.setValidationVisible(true);
		Notification.show("Błędne imię. Duża litera na początku");
		return false;
	}

	public boolean validateLastName(String lastName) {
		if (lastName.matches("[A-Z][a-zA-Z]*")) { //"[a-zA-z]+([ '-][a-zA-Z]+)*"
			return true;
		} else

			textField.setValidationVisible(true);
		Notification.show("Błędne nazwisko. Duża litera na początku");
		return false;
	}
	
	public boolean dateValidation(Object value) throws Validator.InvalidValueException {
		if ((int) value > 1900 && (int) value < (Calendar.YEAR)) {
			return false;

		}
		return true;
	}
}
