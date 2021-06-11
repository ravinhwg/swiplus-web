import React from "react";

import Button from "../components/atoms/Button";

export default {
  title: "Button",
  component: Button,
  // argTypes: {
  //   TextEvent: { control: "color" },
  // },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "hello",
};
