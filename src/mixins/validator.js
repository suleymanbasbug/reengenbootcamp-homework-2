import {
  required,
  maxLength,
  email,
  minValue,
  numeric,
  maxValue,
  minLength,
} from "vuelidate/lib/validators";
export default {
  validations: {
    customers: {
      $each: {
        name: {
          required,
          maxLength: maxLength(15),
        },
        surname: {
          required,
          maxLength: maxLength(15),
        },
        email: { required, email },
        age: {
          required,
          minValue: minValue(6),
          maxValue: maxValue(100),
          numeric,
        },
        hescode: {
          required,
          minLength: minLength(16),
          maxLength: maxLength(16),
        },
        identityNumber: {
          required,
          minLength: minLength(11),
          maxLength: maxLength(11),
          numeric,
        },
        phone: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10),
          numeric,
        },
      },
    },
  },
  computed: {
    nameErrors() {
      return (el) => {
        const errors = [];
        if (!el.$dirty) return errors;
        !el.maxLength && errors.push("Name must be at most 15 characters long");
        !el.required && errors.push("Name is required.");
        return errors;
      };
    },
    surnameErrors() {
      return (el) => {
        const errors = [];
        if (!el.$dirty) return errors;
        !el.maxLength && errors.push("Name must be at most 15 characters long");
        !el.required && errors.push("Name is required.");
        return errors;
      };
    },
    emailErrors() {
      return (el) => {
        const errors = [];
        if (!el.$dirty) return errors;
        !el.email && errors.push("Must be valid e-mail");
        !el.required && errors.push("E-mail is required");
        return errors;
      };
    },
    ageErrors() {
      return (el) => {
        const errors = [];
        if (!el.$dirty) return errors;
        !el.minValue && errors.push("Must be over 6 years old.");
        !el.maxValue && errors.push("Must be over 100 years young.");
        !el.required && errors.push("Age is required");
        return errors;
      };
    },
    hesCodeErrors() {
      return (el) => {
        const errors = [];
        if (!el.$dirty) return errors;
        !el.minLength && errors.push("Must Have 16 Characters.");
        !el.maxLength && errors.push("Must Have 16 Characters.");
        !el.required && errors.push("HESCODE is required");
        return errors;
      };
    },
    identityNumberErrors() {
      return (el) => {
        const errors = [];
        if (!el.$dirty) return errors;
        !el.numeric && errors.push("Must be numbers..");
        !el.minLength && errors.push("Must Have 11 Characters.");
        !el.maxLength && errors.push("Must Have 11 Characters.");
        !el.required && errors.push("Identity Number is required");
        return errors;
      };
    },
    phoneErrors() {
      return (el) => {
        const errors = [];
        if (!el.$dirty) return errors;
        !el.numeric && errors.push("Must be numbers..");
        !el.minLength && errors.push("Must Have 10 Characters.");
        !el.maxLength && errors.push("Must Have 10 Characters.");
        !el.required && errors.push("Phone is required");
        return errors;
      };
    },
  },
};
