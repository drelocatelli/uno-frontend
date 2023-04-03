import LoginTest from "./tests/login.spec";
import LogoutTest from "./tests/logout.spec";
import RandomRoomTest from "./tests/random-room.spec";

const definedTests : DefinedTest[] = [
    {
        name: 'Login',
        class: LoginTest
    },
    {
        name: 'Logout',
        class: LogoutTest
    },
    {
        name: 'Enter random room',
        class: RandomRoomTest
    }
];

export default definedTests;