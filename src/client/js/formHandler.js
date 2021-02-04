//Add your API Call Variables
const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?key=";
const key = process.env.API_KEY;
const output = "&lang=en&of=json&txt=";

async function handleSubmit( event ) {
  event.preventDefault()
  console.log(process.env);
  // check what text was put into the form field
  let formText = document.getElementById( 'website' ).value

  /* Function to GET Web API Data*/
  const getText = async ( baseUrl, key, output, formText ) => {
    const res = await fetch( baseUrl + key + output + formText )
    try {
      const data = await res.json();
      return data;
    } catch ( error ) {
      console.error( "error", error );
    }
  };

  // POST request to server
  const postData = async ( url = '', data = {} ) => {
    console.log("DATA", data)
    const response = await fetch( url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( data ),
    } );
    try {
      const newData = await response.json();
      return newData
    } catch ( error ) {
      console.error( "error", error );
    }
  };

  const updateUI = async () => {
    const request = await fetch( 'http://localhost:8000/all' );
    try {
      const allData = await request.json();
      document.getElementById( 'score' ).innerHTML = `Score: ${ allData.score_tag }`;
      document.getElementById( 'agreement' ).innerHTML = `Agreement: ${ allData.agreement }`;
      document.getElementById( 'subjectivity' ).innerHTML = `Subjectivity: ${ allData.subjectivity }`;
      document.getElementById( 'irony' ).innerHTML = `Irony: ${ allData.irony }`;
      document.getElementById( 'confidence' ).innerHTML = `Confidence: ${ allData.confidence }`;

    } catch ( error ) {
      console.error( "error", error );
    }
  };

  console.log( "::: Form Submitted :::" )

  const data = await getText( baseUrl, key, output, formText );
  await postData( 'http://localhost:8000/addData', {
    score_tag: data.score_tag,
    agreement: data.agreement,
    subjectivity: data.subjectivity,
    irony: data.irony,
    confidence: data.confidence,
  } );

  await updateUI();

}

export { handleSubmit }