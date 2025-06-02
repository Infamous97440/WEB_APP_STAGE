import BillLine from './components/BillLine'
import BoatStats from './components/BoatStats';
import FormWrapper from './components/FormWrapper';

const App = () => {
  return (
    <>
      <div>
        <FormWrapper title="Cherchez les factures par ID!" field1="Facture ID " placeholder1="Entrer un ID"
          button_title="Envoyer"
          validator={(val) => !isNaN(val)}
          component={(id) => <BillLine id={id} />}
        />
        <BoatStats/>
      </div>
    </>
  );
};

export default App
