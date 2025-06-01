import BillLine from './components/BillLine'
import FormWrapper from './components/FormWrapper';

const App = () => {
  return (
    <>
      <div>
        <FormWrapper title="Search bill line by ID!" field1="Bill line ID " placeholder1="Enter an ID"
          button_title="Submit"
          validator={(val) => !isNaN(val) && val > 0 && val <= 1000}
          component={(id) => <BillLine id={id} />}
        />
      </div>
    </>
  );
};

export default App
