import React from "react";

import ProfileHeader from "../components/molecules/ProfileHeader";

export default {
  title: "Profile Header",
  component: ProfileHeader,
};

const Template = (args) => <ProfileHeader {...args} />;

export const Primary = Template.bind({});
