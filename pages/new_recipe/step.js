import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import { chunkSchema, chunkValues } from '../../frontend/utils/stepSchema';
import Form from '../../frontend/shared/Form';

import General from '../../frontend/component/new_recipe/General';
import Times from '../../frontend/component/new_recipe/Times';
import Directions from '../../frontend/component/new_recipe/Directions';
import Ingredients from '../../frontend/component/new_recipe/Ingredients';
import NextButton from '../../frontend/component/new_recipe/NextButton';
import BackButton from '../../frontend/component/new_recipe/BackButton';
import WizardForm from '../../frontend/shared/WizardForm';
import Recap from '../../frontend/component/new_recipe/Recap';

const steps = ['general', 'times', 'directions', 'ingredients', 'recap'];

class Step extends Component {
  static async getInitialProps({ req, res, query, reduxStore }) {
    const isServer = !!req;

    if (isServer) {
      res.writeHead(302, {
        Location: '/new_recipe'
      });
      res.end();
    }

    console.log(query.stepName);

    const newRecipe = reduxStore.getState().newRecipe;

    const { schema, values } = newRecipe;
    const bgImg = values ? values.img : '/static/recipe-bg.jpg';

    if (query.stepName === 'recap') {
      return {
        step: query.step,
        stepName: query.stepName,
        schema,
        values,
        bgImg
      };
    }

    const stepSchema = chunkSchema(schema, query.stepName);
    const stepFilledValues = values
      ? chunkValues(values, query.stepName)
      : null;

    return {
      step: query.step,
      stepName: query.stepName,
      stepSchema,
      stepFilledValues,
      bgImg
    };
  }

  render() {
    const {
      step,
      stepName,
      stepSchema,
      stepFilledValues,
      bgImg,
      schema,
      values
    } = this.props;

    const isRecap = stepName === 'recap';
    console.log('renderStepSchema', stepFilledValues);
    return (
      <Fragment>
        <Head>
          <title>New Recipe - {stepName} | React Recipes</title>
        </Head>
        <div className="img-container" />
        <div className="step-form-container">
          <Form
            data={isRecap ? schema : stepSchema}
            filledValues={isRecap ? values : stepFilledValues}
            step={step}
            render={(
              state,
              onChange,
              onBlur,
              onSubmit,
              validateSingle,
              validateChunk,
              addNewField,
              deleteField,
              formToAPI
            ) => (
              <WizardForm
                validateFields={validateChunk}
                step={step}
                steps={steps}
                render={(error, next) => (
                  <div className="form-container">
                    {
                      {
                        general: (
                          <General
                            stepName={stepName}
                            form={state}
                            changed={onChange}
                            blurred={onBlur}
                          />
                        ),
                        times: (
                          <Times
                            stepName={stepName}
                            form={state}
                            changed={onChange}
                            blurred={onBlur}
                          />
                        ),
                        directions: (
                          <Directions
                            stepName={stepName}
                            form={state}
                            changed={onChange}
                            blurred={onBlur}
                          />
                        ),
                        ingredients: (
                          <Ingredients
                            stepName={stepName}
                            form={state}
                            changed={onChange}
                            blurred={onBlur}
                            validate={validateSingle}
                            addNew={addNewField}
                            deleteField={deleteField}
                          />
                        ),
                        recap: <Recap values={values} />
                      }[stepName]
                    }
                    <div className="nav">
                      <NextButton next={next} fields={state} error={error} />
                      <BackButton step={step} steps={steps} />
                    </div>
                  </div>
                )}
              />
            )}
          />
        </div>
        <style jsx>{`
            .img-container {
                width: 100%;
                height: 100vh;
                position: fixed;
                background: url('${
                  stepFilledValues ? bgImg : '/static/recipe-bg.jpg'
                }') no-repeat center center;
                background-size: cover;
                filter: blur(2px);
                top: 0;
                left:0;
            }

            .step-form-container {
              width: 90%;
              margin: 120px auto 30px auto;
              padding: 10px 0px 30px 0px;
              background: #fff;
              border-radius: 0px 8px 8px 8px;
              position: relative;
              box-shadow: 2px 4px 10px rgba(0,0,0,0.2);
            }

            .step-form-container:before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: ${20 * step}%;
              height: 6px;
              background: rgb(6, 180, 254);
              border-radius:0 8px 8px 0;
            }

            .step-form-container:after {
                content: '${stepName}';
                position: absolute;
                top: 10px;
                left: ${(step - 1) * 10}%;
                text-align: center;
                width: ${20 * step}%;
                font-size: 10px;
                letter-spacing: 0.09375rem;
                color: #777e8e;
            }

            .title-container {
              border-bottom: 1px solid #ccc;
              text-align: center;
            }

            .step-title {
              margin: 10px 0;
              text-transform: capitalize;
              padding: 40px 16px 16px 16px;
            }

            .form-container{
                margin-top: 30px;
            }

            .nav {
              border-top: 1px solid #ccc;
              margin-top: 40px;
              padding: 16px 0;
              display: flex;
              flex-flow: row wrap;
            }
          `}</style>
      </Fragment>
    );
  }
}

export default Step;
