import React, { useState } from "react";

import { Textarea, Box } from "@chakra-ui/react";

export default function BasicEditableTextCard({ csvKey, text = "", onEdit }, props) {
  const [value, setValue] = useState(text);

  const handleInputChange = (event) => {
    onEdit(csvKey, value);
  };

  return (
    <Box mt="4rem">
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
