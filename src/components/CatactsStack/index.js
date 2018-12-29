import { createStackNavigator } from 'react-navigation'

import Contacts from './Contacts';
import ContactSelected from './ContactSelected';
import ContactChat from './ContactChat';

export default createStackNavigator({
    Contacts,
    ContactSelected,
    ContactChat
});