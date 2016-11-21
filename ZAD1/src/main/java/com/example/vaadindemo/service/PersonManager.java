package com.example.vaadindemo.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.example.vaadindemo.domain.Person;

public class PersonManager {
	
	private List<Person> db = new ArrayList<Person>();
	
	public void addPerson(Person person){
		Person p = new Person(person.getFirstName(), person.getYob(), person.getLastName(), person.getEmail(), person.getGender());
		p.setId(UUID.randomUUID());
		db.add(p);
	}
	
	public List<Person> findAll(){
		return db;
	}

	public void delete(Person person) {
		
		Person toRemove = null;
		for (Person p: db) {
			if (p.getId().compareTo(person.getId()) == 0){
				toRemove = p;
				break;
			}
		}
		db.remove(toRemove);		
	}

	public void updatePerson(Person person) {
		Person p = new Person(person.getFirstName(), person.getYob(), person.getLastName(), person.getEmail(), person.getGender());
		p.setId(person.getId());
		delete(person);
		db.add(p);
		
	}
	
	public synchronized List<Person> findAll(String stringFilter) {
		ArrayList<Person> arrayList = new ArrayList<>();
		for (Person contact : db) {
			boolean passesFilter = (stringFilter == null || stringFilter.isEmpty())
					|| contact.toString().toLowerCase().contains(stringFilter.toLowerCase());
			if (passesFilter) {
				arrayList.add(contact);
			}
		}
		Collections.sort(arrayList, new Comparator<Person>() {

			@Override
			public int compare(Person o1, Person o2) {
				return 0;
//						(int) (o2.getId() - o1.getId());
			}
		});
		return arrayList;
	}

}
