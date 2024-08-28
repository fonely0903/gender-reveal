import React, { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import Spinner from 'react-bootstrap/Spinner';

import './App.css';

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const App = props => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (name, guess) => {
    const doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({ Name: name, Guess: guess });
  }

  const onSubmitClick = useCallback(() => {
    const selectedValue = document.querySelector('input[name="genders"]:checked')  
    const guess = selectedValue?.value;
    setIsLoading(true);
    submit(name, guess).then(() => {
      window.location = 'result';
      setIsLoading(false);
    });
  }, [name]);
  
  return (
    <div class='container-fluid text-center' id="container">
      <div class='sector p-3'>
        <h1 id="title_1" class="title">Gender Reveal</h1>
        <p class='text-start'>沒有實體的性別趴，只有爸媽自製的小預測網站～好玩就好，男生女生都是我們的寶</p>
      </div>
      <div class='hint-sector sector px-3 mb-3'>
        <h6 id='hintTitle'>媽媽的提示:</h6>
        <div id='hint'>
          <h5>1. 媽媽喜歡吃酸</h5>
          <h5>2. 媽媽皮膚變好</h5>
          <h5>3. 戒指吊繩前後擺動</h5>
          <h5>4. 清宮圖說女生</h5>
        </div>
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
          <Form.Label>留下你的名字～</Form.Label>
          <Form.Control style={{borderRadius: '30px', padding: '12px'}} type="text" placeholder="浩仁 / Apple" onChange={e => setName(e.target.value)} value={name}  />
        </Form.Group>
        <Button size='lg' className="mt-4" id="submitBtn" variant='outline-secondary' onClick={onSubmitClick}>
          {isLoading && <Spinner animation="border" />}看結果！
        </Button>
      </Form>
    </div>
  )
};

export default App;
