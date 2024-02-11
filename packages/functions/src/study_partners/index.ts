import { addStudyPartner } from '@mpt-sst/core/study_partners/index'
import { ApiHandler } from 'sst/node/api'
import { StudyPartner } from '@mpt-types/StudyPartner'

export const addStudyPartnerHandler = ApiHandler(async _evt => {
  try {
    const partnerDetails: StudyPartner = JSON.parse(
      _evt.body || '',
    ) as unknown as StudyPartner
    if (
      !partnerDetails ||
      !partnerDetails.first_name ||
      !partnerDetails.last_name ||
      !partnerDetails.country ||
      !partnerDetails.timezone ||
      !partnerDetails.topic ||
      !partnerDetails.email
    ) {
      return {
        statusCode: 400,
        body: 'Invalid study partner details',
      }
    }
    await addStudyPartner(partnerDetails)
    return {
      body: 'Study partner added successfully!',
    }
  } catch (e) {
    console.error(
      'Error: Encountered an error when trying to add study partner',
    )
  }
})
