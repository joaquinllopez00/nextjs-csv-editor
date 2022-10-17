import React, { useState } from "react";

import { Textarea, Box } from "@chakra-ui/react";

// Accepts a key of the object subObject, a value (which in this case is the
// value of the name property on the Parent Object) and a function that allows it to edit the parent object
export default function BasicEditableTextCard({ csvKey, text = "", onEdit }, props) {
  const [value, setValue] = useState(text);

  const handleInputChange = (event) => {
    onEdit(csvKey, value);
  };

  return (
    <Box>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleInputChange}
        placeholder=""
        size="sm"
      />{" "}
    </Box>
  );
}
