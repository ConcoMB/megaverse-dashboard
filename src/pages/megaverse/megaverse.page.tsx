import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import YourMegaverse from "../../components/yourMegaverse/your.megaverse";
import GoalMegaverse from "../../components/goalMegaverse/goal.megaverse";
import { FC } from "react";

const MegaversePage: FC = () => {
  return (
    <Tabs className="appBody">
      <TabList>
        <Tab>Your Megaverse</Tab>
        <Tab>Goal Megaverse</Tab>
      </TabList>
      <TabPanel>
        <YourMegaverse />
      </TabPanel>
      <TabPanel>
        <GoalMegaverse />
      </TabPanel>
    </Tabs>
  );
}

export default MegaversePage;
