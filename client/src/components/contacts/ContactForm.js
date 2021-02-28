import React, { useState, useContext , useEffect } from 'react'
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { addContact,  current, setCurrent, clearCurrent, updateContact } = contactContext

    useEffect(() => {
        if(current !== null){
            setConatact(current)
        }
        else{
            setConatact({
                name:'',
                email:'',
                phone:'',
                type:'personal',
            })
        }
    }, [contactContext, current]);
    const [ contact, setConatact ] = useState({
        name:'',
        email:'',
        phone:'',
        type:'personal',
    })

    const {name, email, phone,type} = contact;
    
    const onChange = e => setConatact({ ...contact, [e.target.name]: e.target.value })
    const  onSubmit = e => {
        // update the context Here
        e.preventDefault();
        if( current === null ){
        addContact(contact);
        }
        else
            {
        updateContact(contact);
        }

        clearAll()
    }

const clearAll = () => clearCurrent()
    return (
        <form onSubmit={onSubmit}>
        <h2 className="text-primary"> { current ? 'Edit Contact' :'Add Conatct '} </h2>
        <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
        <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
        <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
        <h5> Conatact Type</h5>
        <input type="radio" placeholder="Type" name="type" value="personal" onChange={onChange}  checked={type === 'personal'}/> Personal {''}
        <input type="radio" placeholder="Type" name="type" value="professional" onChange={onChange}  checked={type === 'professional'}/> professional
        <div>
        <input type="submit"  value={ current ? 'Update Contact' :'Add Conatct '} className="btn btn-primary btn-block"/>
        </div>
        { current && (<div>
            <button className="btn btn-light btn-block" onClick={clearAll } > Clear </button>
            </div>) }
            </form>
    )
}

export default ContactForm;
