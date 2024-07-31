import React, { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

import './App.css';

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const App = props => {
  const [name, setName] = useState('');

  const submit = async (name, guess) => {
    const doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({ Name: name, Guess: guess });
  }

  const onSubmitClick = useCallback(() => {
    const selectedValue = document.querySelector('input[name="genders"]:checked')  
    const guess = selectedValue?.value;
    submit(name, guess);
  }, [name]);
  
  return (
    <div class='container-fluid text-center' id="container">
      <div class='p-3'>
        <h1>小果仁的性別預測</h1>
        <p class='text-start'>沒有實體的性別趴，只有爸媽自製的小預測網站～好玩就好，男生女生都是我們的寶</p>
      </div>
      <div class='p-3 mb-2'>
        <h2>來自媽媽的提示</h2>
        <ListGroup>
          <ListGroup.Item>媽媽喜歡吃酸</ListGroup.Item>
          <ListGroup.Item>媽媽皮膚變好</ListGroup.Item>
          <ListGroup.Item>戒指吊繩前後擺動</ListGroup.Item>
          <ListGroup.Item>清宮圖說女生</ListGroup.Item>
        </ListGroup>
      </div>
      <Form class='p-3'>
        <Form.Group controlId='genderForm.Gender'>
          <h2>選出你的預測吧</h2>
          <div class="d-flex justify-content-center" id="gender-radios">
            <div>
              <input type="radio" class="btn-check" name="genders" id="girl" value="Phoebe" autocomplete="off" />
              <label class="btn rounded-circle gender-label" for="girl">Phoebe <br/>女生</label>
            </div>
            <div>
              <input type="radio" class="btn-check" name="genders" id="boy" value="Jensen" autocomplete="off"/>
              <label class="btn rounded-circle gender-label" for="boy">Jensen <br/>男生</label>
            </div>
          </div>
        </Form.Group>
        <Form.Group controlId='genderForm.Name' class='mt-3'>
          <Form.Label>你是誰？</Form.Label>
          <Form.Control type="text" placeholder="浩仁" onChange={e => setName(e.target.value)} value={name}  />
        </Form.Group>
        <Button size='lg' className="mt-4" id="submitBtn" variant='outline-secondary' onClick={onSubmitClick}>看結果！</Button>
      </Form>
      
      
    </div>
  );
};

export default App;
