/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import ErrorDiv from "../Shared/ErrorDiv";
import { patchSettingData } from "../../Redux/Slices/userSlice";
import { hourType } from "../../Adapter/types";

const Settings: FC = () => {
  const dispatch = useDispatch();
  const initialValues: hourType = {
    officeHour: "",
    minWH: "",
  };

  function onSubmit(values): void {
    const temp = {
      officeHour: values.officeHour,
      minWH: values.minWH,
    };
    dispatch(patchSettingData(temp));
  }

  function validate(values: hourType) {
    const errors: any = {};
    if (values.officeHour === "null") errors.officeHour = "Required";
    if (!values.minWH) errors.minWH = "Required";
    return errors;
  }
  return (
    <div className="settings">
      <h5
        style={{
          color: "#04aa6d",
          fontFamily: "sans-serif",
        }}
      >
        Work Hour Settings
      </h5>
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
          <label htmlFor="minWH">Work Hours</label>
          <Field
            type="number"
            id="officeHour"
            name="minWH"
            placeholder="Work Hours"
            style={{
              fontSize: "12px",
              borderRadius: "4px",
              height: "10%",
              width: "20%",
            }}
          />
          <ErrorMessage name="minWH" component={ErrorDiv} />
          <button className="updatebutton" type="submit">
            update
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Settings;
