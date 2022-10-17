import React, { useState } from "react";

import { Importer, ImporterField } from "react-csv-importer";

// include the widget CSS file whichever way your bundler supports it
import "react-csv-importer/dist/index.css";

//Takes external CSV data and updates the state of the parent component, which is the page
export default function CsvImporter({ setParentJson, setShowImporter }, props) {
  const [tempObj, setTempObj] = useState({});

  return (
    <Importer
      assumeNoHeaders={false} // optional, keeps "data has headers" checkbox off by default
      restartable={false} // optional, lets user choose to upload another file when import is complete
      onStart={({ file, preview, fields, columnFields }) => {
        // optional, invoked when user has mapped columns and started import
        //TODO: Invoke loader animation
      }}
      processChunk={async (rows, { startIndex }) => {
        // required, may be called several times
        // receives a list of parsed objects based on defined fields and user column mapping;
        // (if this callback returns a promise, the widget will wait for it before parsing more data)
        rows.forEach((row, idx) => {
          // Add row to tempObj
          setTempObj((prev) => {
            return { ...prev, [idx]: row };
          });
        });
      }}
      onComplete={({ file, preview, fields, columnFields }) => {
        // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
        //TODO: Stop loader animation
        //TODO: Render TextFields
        console.log(tempObj, "tempObj");
        //Set Parent JSON to the tempObj
        setParentJson(tempObj);
      }}
      onClose={({ file, preview, fields, columnFields }) => {
        // optional, if this is specified the user will see a "Finish" button after import is done,
        // which will call this when clicked
        //TODO: Navigate to 'editor' page
        setShowImporter(false);
      }}

      // CSV options passed directly to PapaParse if specified:
      // delimiter={...}
      // newline={...}
      // quoteChar={...}
      // escapeChar={...}
      // comments={...}
      // skipEmptyLines={...}
      // delimitersToGuess={...}
      // chunkSize={...} // defaults to 10000
      // encoding={...} // defaults to utf-8, see FileReader API
    >
      <ImporterField name="name" label="Name" />
      <ImporterField name="email" label="Email" />
      <ImporterField name="address" label="Address" optional />
      <ImporterField name="phoneNumber" label="Phone Number" optional />
    </Importer>
  );
}
