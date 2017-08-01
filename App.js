import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './home_screen';

const App = StackNavigator({
    Home: { screen: HomeScreen }
});

export default App;
