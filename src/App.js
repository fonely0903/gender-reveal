import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react';

const App = props => {
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
              <input type="radio" class="btn-check" name="options" id="girl" autocomplete="off" />
              <label class="btn rounded-circle gender-label" for="girl">Phoebe <br/>女生</label>
            </div>
            <div>
              <input type="radio" class="btn-check" name="options" id="boy" autocomplete="off"/>
              <label class="btn rounded-circle gender-label" for="boy">Jensen <br/>男生</label>
            </div>
          </div>
        </Form.Group>
        <Form.Group controlId='genderForm.Name' class='mt-3'>
          <Form.Label>你是誰？</Form.Label>
          <Form.Control type="text" placeholder="浩仁" />
        </Form.Group>
        <Button type="submit" size='lg' className="mt-4" id="submitBtn" variant='outline-secondary'>看結果！</Button>
      </Form>
      
      
    </div>
  );
};

export default App;
