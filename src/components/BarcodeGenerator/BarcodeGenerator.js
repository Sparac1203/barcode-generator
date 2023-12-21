import React, { useState } from 'react';
import axios from 'axios';

import './BarcodeGenerator.css'

const BarcodeGenerator = () => {
  const [formData, setFormData] = useState({
    policyPrice: '',
    customerFullName: '',
    customerStreet: '',
    customerCity: '',
    insuranceProviderName: '',
    insuranceProviderCity: '',
    insuranceProviderAddress: '',
    insuranceProviderIban: '',
    policyNumber: '',
    licencePlate: '',
  });

  const [generatedBarcode, setGeneratedBarcode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:8080/barcode', {
        params: {
          data: generateHub3Code(formData),
          width: 400,
          height: 200,
        },
      });

      const barcodeBase64 = response.data.barcode;
      const base64Chunks = barcodeBase64.split('\n').map(chunk => chunk.trim());

      // Decode each base64 chunk
      const decodedStrings = base64Chunks.map(chunk => atob(chunk));
      const fullDecodedString = decodedStrings.join('');

      setGeneratedBarcode(fullDecodedString);

      console.log(generatedBarcode);
    } catch (error) {
      console.error('Error generating barcode:', error.message);
    }
  };

  const generateHub3Code = (data) => {
    const {
      policyPrice,
      customerFullName,
      customerStreet,
      customerCity,
      insuranceProviderName,
      insuranceProviderCity,
      insuranceProviderAddress,
      insuranceProviderIban,
      policyNumber,
      licencePlate,
    } = data;

    const hub3Code = `HRVHUB30\nEUR\n${policyPrice}\n${clearCroatianCharacters(
      customerFullName
    )}\n${clearCroatianCharacters(customerStreet)}\n${clearCroatianCharacters(
      customerCity
    )}\n${insuranceProviderName}\n${insuranceProviderCity}\n${insuranceProviderAddress}\n${insuranceProviderIban}\nHR00\n${policyNumber}\nCOST\nObavezno auto osiguranje za ${licencePlate}\n`;

    return hub3Code;
  };

  const clearCroatianCharacters = (text) => {
    return text;
  };

  return (
    <div>
      <h1>Barcode Generator</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Generate Barcode</button>
      </form>

      {generatedBarcode && (
        <div>
          <h2>Generated Barcode:</h2>
          <img src={`data:image/png;base64,${generatedBarcode}`} alt="barcodePaymentImage" />
        </div>
      )}
    </div>
  );
};

export default BarcodeGenerator;
