/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikHelpers } from 'formik';
import { FieldType } from '../types';
import { FORM_DATA_TEST_PREFIX } from '../constants';
import { scrollToElementByDataTest } from './helper';

type SetTouchedType<Values> = FormikHelpers<Values>['setTouched'];
type ValidateForm<Values> = FormikHelpers<Values>['validateForm'];

export class FieldHelper {
  fieldsTouched: { [key: string]: boolean } = {};
  allErrors: { [key: string]: boolean } = {};
  touchFields: { [key: string]: any } = {};
  firstErrorTestId = '';
  validateForm: ValidateForm<any>;
  setTouched: SetTouchedType<any>;
  fields: FieldType[];

  constructor(
    fields: FieldType[],
    validateForm: ValidateForm<any>,
    setTouched: SetTouchedType<any>
  ) {
    this.fields = fields;
    this.validateForm = validateForm;
    this.setTouched = setTouched;
  }

  verifyFields = async (
    from = 0,
    to = this.fields.length,
    scrollIfError = true
  ) => {
    this.touchFields = {};
    const fieldsToValidate = this.fields.slice(from, to);
    fieldsToValidate.forEach((f) => (this.fieldsTouched[f.field] = true));

    fieldsToValidate.forEach((f) => {
      if (f.field.includes('.')) {
        const groupId = f.field.split('.')[0];
        const key = f.field.split('.')[1];
        if (!this.touchFields[groupId]) {
          this.touchFields[groupId] = {};
        }
        this.touchFields[groupId][key] = true;
      } else {
        this.touchFields[f.field] = true;
      }
      this.setTouched({ ...this.touchFields });
    });

    await this.processErrors();

    if (scrollIfError) {
      this.scrollToError();
    }

    return {
      hasErrors: Object.keys(this.allErrors).length > 0,
      firstErrorTestId: this.firstErrorTestId,
    };
  };

  processErrors = async () => {
    const errors: any = await this.validateForm();
    Object.keys(this.fieldsTouched).map((ft) => {
      if (ft.includes('.')) {
        const groupId = ft.split('.')[0];
        const key = ft.split('.')[1];
        if (errors[groupId] && errors[groupId][key]) {
          if (!this.firstErrorTestId) {
            this.firstErrorTestId = FORM_DATA_TEST_PREFIX + ft;
          }
          this.allErrors[key] = errors[groupId][key];
        }
      } else {
        if (errors[ft]) {
          if (!this.firstErrorTestId) {
            this.firstErrorTestId = FORM_DATA_TEST_PREFIX + ft;
          }
          this.allErrors[ft] = errors[ft];
        }
      }
    });
  };

  scrollToError = () => {
    if (this.firstErrorTestId) {
      scrollToElementByDataTest(this.firstErrorTestId);
    }
  };
}
