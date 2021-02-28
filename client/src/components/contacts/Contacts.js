import React, { Fragment, useContext , useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";
import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {filtered , contacts, getContacts,loading  } = contactContext;

    useEffect( () => {
        getContacts();
        // eslint-disable-next-line
    }, [])

    if(contacts !== null && contacts.length === 0 && !loading ){
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>

        { contacts !== null && !loading ? (
            <TransitionGroup>
        {  filtered !== null ? filtered.map( contact => (
            <CSSTransition key={contact._id}  timeout={500} classNames="item">
            <ContactItem  
            key={contact.id}
            contact={contact} 
            type={contact.type}
            name={contact.name}
            phone={contact.phone}
            email={contact.email}
            /> 
            </CSSTransition>
            )) : contacts.map(contact => (
                <CSSTransition key={contact._id}  timeout={500} classNames="item">
                <ContactItem  
                key={contact.id}
                contact={contact} 
                type={contact.type}
                name={contact.name}
                phone={contact.phone}
                email={contact.email}
            /> 
            </CSSTransition>  
            ))}
            </TransitionGroup>
        ) : <Spinner/> }
        
        </Fragment>
    )
}
 
export default Contacts;

