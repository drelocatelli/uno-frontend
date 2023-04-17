import Alert from './components/alert/alert.component';
import Routes from './routes';

function App() {

    document.title = process.env.NODE_ENV == 'production' ? document.title : document.title.concat(' - developer mode');

    return (
        <>
            <Routes />
            <Alert />
        </>
    );
}

export default App;
