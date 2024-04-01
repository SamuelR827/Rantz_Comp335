const MadlibComponent = () => {
    const [madlibData, setMadlibData] = React.useState({ adjective: 'sparkly', adverb: 'really', noun1: 'dog', noun2: 'cat', noun3: 'window', noun4: 'house', noun5: 'word', noun6: 'pizza slice', pnoun1: 'boats', pnoun2: 'phones', pnoun3: 'foxes', pnoun4: 'apples', pnoun5: 'pencils', verb1: 'run', verb2: 'jump', mword: 'monkey'});
    const [message, setMessage] = React.useState('');
  
    const sendStuff = async (event) => {
      event.preventDefault(); // prevent madlib default event which refreshes the page
      try {
        const response = await fetch('/madlibs', {
          method: 'POST',
          headers: {'Content-Type': 'application/json;charset=UTF-8',},
          body: JSON.stringify(madlibData),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setMessage(await response.json());  // assuming response is JSON
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
    const handleChange = (event) => {
      const { id, value } = event.target;
      setMadlibData((prevMadlibData) => {
        // Spread the previous state
        const updatedMadlibData = { ...prevMadlibData };
        // Update the property corresponding to the provided id with the new value
        updatedMadlibData[id] = value;
        return updatedMadlibData; // Return the updated state
      });
    };
  
    return (
      <div>
        <form method="post" onSubmit={sendStuff}>
          <label> Enter Adjective </label><br />
          <input type="text" id="adjective" placeholder="Adjective" 
                              value={madlibData.adjective} onChange={handleChange}></input><br />
          <label> Enter Adverb </label> <br />
          <input type="text" id="adverb" placeholder="Adverb" 
                              value={madlibData.adverb} onChange={handleChange}></input><br /><br />
          <label> Enter Noun #1 </label> <br />
          <input type="text" id="noun1" placeholder="Noun # 1"
                              value={madlibData.noun1} onChange={handleChange}></input><br /><br />
          <label>Enter Noun #2 </label> <br />
          <input type="text" id="noun2" placeholder="Noun # 2"
                              value={madlibData.noun2} onChange={handleChange}></input><br /><br />
          <label> Enter Noun #3 </label> <br />
          <input type="text" id="noun3" placeholder="Noun # 3"
                              value={madlibData.noun3} onChange={handleChange}></input><br /><br />
          <label> Enter Noun #4 </label> <br />
          <input type="text" id="noun4" placeholder="Noun # 4"
                              value={madlibData.noun4} onChange={handleChange}></input><br /><br />
          <label> Enter Noun #5 </label> <br />
          <input type="text" id="noun5" placeholder="Noun # 5"
                              value={madlibData.noun5} onChange={handleChange}></input><br /><br />
          <label> Enter Noun #6 </label> <br />
          <input type="text" id="noun6" placeholder="Noun # 6"
                              value={madlibData.noun6} onChange={handleChange}></input><br /><br />
          <label> Enter Plural Noun #1 </label> <br />
          <input type="text" id="pnoun1" placeholder="Plural Noun # 1"
                              value={madlibData.pnoun1} onChange={handleChange}></input><br /><br />
          <label> Enter Plural Noun #2 </label> <br />
          <input type="text" id="pnoun2" placeholder="Plural Noun # 2"
                              value={madlibData.pnoun2} onChange={handleChange}></input><br /><br />
          <label> Enter Plural Noun #3 </label> <br />
          <input type="text" id="pnoun3" placeholder="Plural Noun # 3"
                              value={madlibData.pnoun3} onChange={handleChange}></input><br /><br />
          <label> Enter Plural Noun #4 </label> <br />
          <input type="text" id="pnoun4" placeholder="Plural Noun # 4"
                              value={madlibData.pnoun4} onChange={handleChange}></input><br /><br />
          <label> Enter Plural Noun #5 </label> <br />
          <input type="text" id="pnoun5" placeholder="Plural Noun # 5"
                              value={madlibData.pnoun5} onChange={handleChange}></input><br /><br />
          <label> Enter Verb #1 </label> <br />
          <input type="text" id="verb1" placeholder="Verb # 1"
                              value={madlibData.verb1} onChange={handleChange}></input><br /><br />
          <label> Enter Verb #2 </label> <br />
          <input type="text" id="verb2" placeholder="Verb # 2"
                              value={madlibData.verb2} onChange={handleChange}></input><br /><br />
          <label> Enter Word Beginning with M </label> <br />
          <input type="text" id="mword" placeholder="Word Beginning with M"
                              value={madlibData.mword} onChange={handleChange}></input><br /><br />
          <input type="submit" value="Post something"></input>
        </form>
        {message && (
          <>
          <p>{message.results}</p>
          </>
        )}
      </div>
    );
  };
  
  const madlibs = ReactDOM.createRoot(document.getElementById('madlibs'));
  madlibs.render(<MadlibComponent />);