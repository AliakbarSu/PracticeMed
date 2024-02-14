// import * as mongodb from 'mongodb'
// import { Config } from 'sst/node/config'
import { SubmittedAnswer } from '../../types/Result' // import { saveSubmittedAnswer as saveSubmittedAnswerModel } from '../model/test'
// import { saveSubmittedAnswer as saveSubmittedAnswerModel } from '../model/test'

export const saveSubmittedAnswer = async (data: {
  userId: string;
  testId: string;
  answer: SubmittedAnswer;
}) => {
  // return saveSubmittedAnswerModel({
  //   testId: data.testId,
  //   userId: data.userId,
  //   answer: data.answer
  // })
};
