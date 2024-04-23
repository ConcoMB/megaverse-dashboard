import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import YourMegaverse from "./pages/yourMegaverse/your.megaverse"
import GoalMegaverse from "./pages/goalMegaverse/goal.megaverse";

function App() {
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

export default App;
