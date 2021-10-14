/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import ErrorDiv from "../Shared/ErrorDiv";
import { patchSettingData } from "../../Redux/Slices/adminSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const initialValues = {
    officeHour: "",
    minWH: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    const temp = {
      officeHour: values.officeHour,
      minWH: values.minWH,
    };
    dispatch(patchSettingData(temp));
  };

  const validate = (values) => {
    const errors = {};
    if (values.officeHour === "null") errors.officeHour = "Required";
    if (!values.minWH) errors.minWH = "Required";
    return errors;
  };
  return (
    <div className="settings">
      <h4
        style={{
          color: "#04aa6d",
          fontFamily: "sans-serif",
        }}
      >
        General Settings
      </h4>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        <Form className="settingForm">
          <label htmlFor="officeHour">Office Hours</label>
          <Field
            as="select"
            name="officeHour"
            id="officeHour"
            placeholder="Select Office Hours"
            style={{
              fontSize: "12px",
              borderRadius: "4px",
              height: "10%",
            }}
          >
            <option value="null">Select Office Hours</option>
            <option value="9:00am-6:00pm">9:00am-6:00pm</option>
            <option value="8:30am-5:00pm">8:30am-5:00pm</option>
            <option value="8:00am-6:00pm">8:00am-6:00pm</option>
          </Field>
          <ErrorMessage name="officeHour" component={ErrorDiv} />{" "}
          <label htmlFor="minWH">Min Work Hours</label>
          <Field
            type="number"
            id="officeHour"
            name="minWH"
            placeholder="Min Work Hours"
          />
          <ErrorMessage name="minWH" component={ErrorDiv} />
          <button
            className="updatebutton"
            type="submit"
          >
            update
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Settings;
