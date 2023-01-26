const Contact = () => (
    <div className='contact'>
      <h1>contact</h1>
      <div className='email-form-container'>
        <form className='email-form'>
          <label for='email'>Email:</label>
          <input type="email" id='email' name='email'/>
          <br/>
          <label for='message'>Write your message below:</label>
          <textarea rows='4' cols='50' id='message' name='message'></textarea>
          <br/>
          <button type='submit' name='submit' id='submit'>Submit</button>
        </form>
      </div>
    </div>

    
  );


export default Contact