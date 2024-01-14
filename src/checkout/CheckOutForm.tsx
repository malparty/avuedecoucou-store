'use client';

import FieldSetWithStatus from '@/components/FieldSetWithStatus';
import InfoBlock from '@/components/InfoBlock';
import SubmitButtonWithStatus from '@/components/SubmitButtonWithStatus';
import { useLayoutEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import ErrorNote from '@/components/ErrorNote';

export default function CheckOutForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [response, action] = useFormState(() => {
    alert('Bonnnnsoiiiiiirreeuh');
  }, undefined);

  const emailRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    emailRef.current?.focus();
  }, []);

  const isFormValid =
    email.length > 0 && firstName.length > 0 && lastName.length > 0 && phone.length > 0 && address1.length > 0;

  return (
    <InfoBlock>
      <form action={action}>
        <div className="space-y-8">
          {response === undefined && <ErrorNote>Certains champs sont invalides</ErrorNote>}
          <div className="space-y-4">
            <FieldSetWithStatus
              id="email"
              inputRef={emailRef}
              label="Admin Email"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <FieldSetWithStatus
              id="firstName"
              label="Prénom"
              type="text"
              value={firstName}
              onChange={setFirstName}
            />
            <FieldSetWithStatus
              id="lastName"
              label="Nom"
              type="text"
              value={lastName}
              onChange={setLastName}
            />
            <FieldSetWithStatus
              id="phone"
              label="Téléphone (pour le livreur)"
              type="text"
              value={phone}
              onChange={setPhone}
            />
            <FieldSetWithStatus
              id="address1"
              label="Adresse (ligne 1)"
              type="text"
              value={address1}
              onChange={setAddress1}
            />
            <FieldSetWithStatus
              id="address2"
              label="Adresse (ligne 2)"
              type="text"
              value={address2}
              onChange={setAddress2}
            />
            <FieldSetWithStatus
              id="address3"
              label="Adresse (ligne 3)"
              type="text"
              value={address3}
              onChange={setAddress3}
            />
          </div>
          <InfoBlock>
            Après le placement de votre commande, nous vous contacterons sous 2 jours ouvrés avec les informations pour
            procéder au paiement.
          </InfoBlock>
          <SubmitButtonWithStatus disabled={!isFormValid}>Placer la commande</SubmitButtonWithStatus>
        </div>
      </form>
    </InfoBlock>
  );
}
