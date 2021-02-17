// POST request to server
const postData = async ( url = '', data = {} ) => {
  console.log("DATA", data)
  const response = await fetch( url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( data ),
  } );
  try {
    const newData = await response.json();
    console.log( "newData", newData );
    return newData
  } catch ( error ) {
    console.error( "error", error );
  }
};


async function handleSubmit( event ) {
  event.preventDefault()
  console.log(process.env);
  // check what text was put into the form field
  let formText = document.getElementById( 'website' ).value
  // console.log("checkForUrl", Client.checkForUrl(formText));
  if(Client.checkForUrl(formText)) {

    console.log( "::: Form Submitted :::" )

    postData( 'http://localhost:8000/addData', { url: formText } )
      .then( response => {
        console.log( "Janni", response );
        document.getElementById( 'score' ).innerHTML = `Score: ${ response.score_tag }`;
        document.getElementById( 'agreement' ).innerHTML = `Agreement: ${ response.agreement }`;
        document.getElementById( 'subjectivity' ).innerHTML = `Subjectivity: ${ response.subjectivity }`;
        document.getElementById( 'irony' ).innerHTML = `Irony: ${ response.irony }`;
        document.getElementById( 'confidence' ).innerHTML = `Confidence: ${ response.confidence }`;
      } )
  }
}

export { handleSubmit }
