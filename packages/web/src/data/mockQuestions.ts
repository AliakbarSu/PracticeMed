import type { Test } from '@/types/test'

export const mockTest: Test = {
  id: 'mockTest123',
  name: 'Preview',
  description:
    'The AMC MCQ test is a standardized exam designed to assess the medical knowledge and clinical skills of international medical graduates who wish to practice medicine in Australia. The test consists of multiple-choice questions covering a broad range of medical topics such as anatomy, physiology, pharmacology, and pathology. The exam is considered challenging and requires a deep understanding of fundamental medical concepts and their practical applications in clinical settings. Our mock test product is designed to help candidates prepare for the AMC MCQ test and familiarize themselves with the format, style, and level of difficulty of the exam. The mock test includes questions that are similar to those found on the actual exam, providing candidates with a realistic and effective way to gauge their knowledge and identify areas where they need to improve.',
  type: 'MCQ',
  timeLimit: 1,
  instructions: `
  <ul style="padding-left: 36px; list-style: upper-latin;">
    <li>Ensure you have a stable internet connection to avoid any disruptions during the test.</li>
    <li>Find a quiet and comfortable space to take the test, free from distractions.</li>
    <li>Keep a notepad and pen/pencil handy for rough work, if needed.</li>
    <li>Set aside the required time for the test to be completed uninterrupted.</li>
    <li>Read each question carefully and pay attention to the specific instructions provided.</li>
    <li>Remember that the preview test is a sample of the actual test, so use this opportunity to familiarize yourself with the format and types of questions.</li>
    <li>Stay calm and focused throughout the test, as this will help you perform better.</li>
  </ul>
  <p>Once you're ready, click the 'Start the test' button and begin your journey towards success!</p>
  `,
  thumbnail: [],
  questions: [
    {
      id: 'questionOne',
      text: '<p>An 85-year old woman who lives in a small rural Midwest town has always kept active despite her age, singing in her church choir, baby sitting her great-grandchildren, etc. However, for the past several months she has not felt well, not even able to muster sufficient energy to go to church on Sunday mornings, let alone go to choir practice. Also, she has problems sleeping, is extremely nervous with hand tremors, constantly anxious, sweats more than usual and can\u2019t stand having the heat on, has chronic diarrhea, and has the sensation that her heart races. When she mentions some of these observations to her local primary care provider, he basically shrugs them off, saying that no one of her age can expect to feel as they did when younger. He was worried however by the fact her systolic pressure rose from an average of 125 mm Hg to 185 mm Hg at the time of her visit; he prescribed hydrochlorothiazide and suggested she return in 3 months for a follow-up examination. However, in the meantime, she started to have trouble with her eyes: she had double vision and they appeared to her to be reddish and swollen; they also were itchy. Consequently her granddaughter took her to an optometrist who practiced in a nearby town. After her initial examination, the optometrist became alarmed to such a degree that she arranged a visit to the Mayo Clinic in Rochester Minnesota. After giving her a thorough physical, the physicians there started her on a therapy with the aim of alleviating the underlying cause of her symptoms, including the problem with her eyes. Which of the following choices most probably describes an aspect of the treatment used to alleviate the underlying cause of her symptoms?</p>',
      field: 'Medicine',
      options: [
        {
          id: 'a',
          alpha: 'a',
          text: 'Prescription of levothyroxine'
        },
        {
          id: 'b',
          alpha: 'b',
          text: 'Injection of interferon-\u03b2 1a'
        },
        {
          alpha: 'c',
          text: 'Watchful waiting',
          id: 'c'
        },
        {
          alpha: 'd',
          text: 'Prescription of zolpidem',
          id: 'd'
        },
        {
          alpha: 'e',
          text: 'Prescription of propylthiouracil',
          id: 'e'
        }
      ],
      correct_option_explanation:
        '<strong>The correct answer is 5.</strong><br>This lady has Graves\u2019s disease and the optometrist recognized signs of Graves\u2019s\u2019 ophthalmopathy. Graves\u2019s disease is a form of hyperthyroidism caused by an autoimmune reaction of unknown etiology. The core of treatment is to reduce the production of thyroid hormone by the gland. This can be done by antithyroid drugs, radioactive iodine treatment, or surgery. Usually, the first line of treatment is by drugs either propylthiouracil or methimazole is used. The problem with this lady\u2019s eyes also needed to be treated with surgery to relieve the pressure behind the eyes caused by the infiltrating exophthalmos, which causes the swollen, bulging eyes very often associated with Graves\u2019s disease. It is thought that this exophthalmus is due to common antigens shared by the tissues behind the eye and the thyroid gland; as a result exophthalmus is an almost 100% specific symptom for Graves\u2019s disease. It is estimated that the incidence of Graves\u2019s disease is about 30\u201380 cases per 100,000 individuals, and it affects seven to eight females for every one male. Typically, the incidence peaks between the ages of 20\u201340 years. It is likely that this lady\u2019s primary health care provider did not think Graves\u2019s disease because she was so far outside of the \u201ctypical\u201d range. Had the disease not been discovered and treated it would have continued to ravage her body, possibly even leading to irreversible blindness and/or death.'
    },
    {
      id: 'QuestionTwo',
      text: '<p>A 67-year-old man presents with headache, vomiting, blurred vision, difficulty with speaking and swallowing, and loss of balance. He also complains of numbness in his face. His past history is significant for diabetes mellitus and hypertension. The patient presently is on metformin for the former and a combination of an angiotensin converting enzyme (ACE) inhibitor and diuretic for the latter. The acute problem occurred approximately 2 hours prior to being seen in the emergency room. His blood pressure is 150/100 mm Hg, his pulse rate is 80/min with a few irregular beats, and his temperature and respiratory rate are normal. The patient is conscious, the left pupil is smaller than the right, and the eyeball appears to be sunken into the orbit. He also has partial closure of the left upper eyelid. He has no pain sensations over the left side of the face to pinprick. However, touch is preserved. His gag reflex is depressed, and the palate is noticeably lowered on the left side, with the uvula being pulled to the right when he was asked to say, \u201caaah.\u201d There was a noticeable nystagmus to the left, and he has poor coordination of his left upper and lower extremities. His gait is ataxic. When tested with a pin, he cannot feel pain in the right upper and lower extremities. However, the sensation of touch is preserved. A noncontrast computerized tomography (CT) of the brain was normal. Which of the following is the best means of immediate medical management in this patient?</p>',
      field: 'Medicine',
      options: [
        {
          alpha: 'a',
          text: 'Heparinization and observation',
          id: 'a'
        },
        {
          alpha: 'b',
          text: 'Right carotid endarterectomy',
          id: 'b'
        },
        {
          alpha: 'c',
          text: 'Left carotid endarterectomy',
          id: 'c'
        },
        {
          alpha: 'd',
          text: 'Thrombolytics',
          id: 'd'
        },
        {
          alpha: 'e',
          text: 'Antiplatelet agents',
          id: 'e'
        }
      ],
      correct_option_explanation:
        '<strong>The correct answer is 4.</strong><br>This patient most likely has had an infarction involving the posterolateral portion of the medulla oblongata as a result of blockage of the posterior inferior cerebellar artery (PICA) on the left side. The condition is also known as Wallenberg syndrome, which might also be caused by occlusion of the vertebral artery. The computerized tomography scan shows no evidence of hemorrhage, and therefore the diagnosis of ischemic infarction is appropriate. Since his condition has been present for less than 3 hours, it is prudent to use a thrombolytic agent <strong>(Choice 4)</strong> as the initial medication. In the thrombolytic system, plasminogen is activated into plasmin by tissue plasminogen activator (tPA); plasmin then further decreases fibrin into degraded peptides. Plasminogen activator must be administered within 3 hours of the onset of the acute event to be efficacious. It is contraindicated if the blood pressure is sustained above l85/ll0. No other antithrombotic treatment should be instituted for 24 hours.'
    },
    {
      id: 'questionThree',
      text: '<p>A 60-year-old man presents to the emergency room with a history of vomiting, increasing confusion, hearing voices, and blurred vision. The patient provided a history of congestive cardiac failure and reported he is being treated with an unnamed diuretic, enalapril, carvedilol, and digoxin. His blood pressure is 140/95 mm Hg; pulse, 88/min irregular; respirations, 22/min; and body temperature is normal. Physical examination confirmed altered mental status, an irregular cardiac rhythm to auscultation, and basilar rales on the left, but there is no cyanosis or pallor. The electrocardiogram shows left axis deviation and paroxysmal atrial tachycardia with block. A chest x-ray film confirms left ventricular hypertrophy with blunting of the left costophrenic angle and diffuse shadowing at the base. Effective management of cardiac dysfunction would include which one of the following?</p>',
      field: 'Medicine',
      options: [
        {
          alpha: 'a',
          text: 'Raising the serum sodium level',
          id: 'a'
        },
        {
          alpha: 'b',
          text: 'Raising the serum magnesium level',
          id: 'b'
        },
        {
          alpha: 'c',
          text: 'Lowering the serum magnesium level',
          id: 'c'
        },
        {
          alpha: 'd',
          text: 'Raising the serum calcium level',
          id: 'd'
        },
        {
          alpha: 'e',
          text: 'Raising the serum potassium level',
          id: 'e'
        }
      ],
      correct_option_explanation:
        '<strong>The correct answer is 5.</strong><br>This patient has symptoms of digitalis toxicity in addition to cardiac failure. Digitalis toxicity leads to vomiting, increasing confusion, hallucinations, photophobia, yellow vision, and cardiac arrhythmias that could be potentially dangerous if left untreated, because supraventricular tachycardia (SVT) and atrioventricular (AV) block could supervene, or even worse, ventricular tachycardia and fibrillation. The presence of SVT and AV block signifies cardiotoxicity. Digitalis toxicity may be precipitated by hypokalemia, and therefore, the serum potassium level should be increased, maintaining it between 4.0 and 5.0 mmol/L. There is a strong possibility the patient is on a loop diuretic (such as furosemide), which restricts sodium and chloride reabsorption in the proximal part of the ascending loop of Henle, with resultant excretion of sodium, water, chloride, and potassium. Digitalis administration should be discontinued temporarily. The serum digitalis level does not correlate with digitalis toxicity.'
    },
    {
      id: 'questionFour',
      text: '<p>A 69-year-old man with a known history of coronary artery disease (CAD), atrial fibrillation, and hypertension presents with sudden onset of right facial weakness and numbness. He also complains of a roaring in the right ear. On examination, he has some difficulty with speech. He does not have a pronator drift, and his grip strength is normal. However, there is weakness of the face on the right side, including the orbicularis oculi. He is unable to appreciate taste on the anterior tongue on the right side. He has normal sensations on the face to touch and pinprick. Which of the following would best explain these findings?</p>',
      field: 'Medicine',
      options: [
        {
          alpha: 'a',
          text: 'Upper motor neuron lesion',
          id: 'a'
        },
        {
          alpha: 'b',
          text: 'Brainstem glioma',
          id: 'b'
        },
        {
          alpha: 'c',
          text: 'Left middle cerebral artery embolus',
          id: 'c'
        },
        {
          alpha: 'd',
          text: 'Hemorrhage within the left internal capsule',
          id: 'd'
        },
        {
          alpha: 'e',
          text: 'Lower motor neuron lesion',
          id: 'e'
        }
      ],
      correct_option_explanation:
        '<strong>The correct answer is 5.</strong><br>This patient has a lower motor neuron lesion affecting cranial nerve VII\u2014the facial nerve (CN VII) on the right side\u2014and is also known as Bell\u2019s palsy. Facial palsy is the most common of the cranial neuropathies. Most cases are due to infection with herpes simplex virus and are not idiopathic, as was believed earlier. The facial nerve innervates the muscles of the face and the stapedius muscle in the ear and conveys taste fibers to the anterior two-thirds of the tongue, via the chorda tympani nerve. The roaring in the ear (hyperacusis) and lack of taste in the anterior portion of the tongue are due to involvement of the aforementioned innervation. The problem with speech is due to dysarthria, resulting from paralysis of the muscles around the mouth. The inability to close his eye can put his cornea, and indeed the eye, in danger. Hence, the eyelid should be taped shut or covered with an eye patch. The facial nerve also supplies the lacrimal gland; absence of tears could result in xerophthalmia (corneal drying) and attendant complications, hence artificial tears are necessary. Corticosteroids are helpful. The disorder usually resolves over time. Other causes of lower motor neuron facial paralysis include lesions in the brainstem, cerebellopontine angle, middle ear infection, multiple sclerosis, human immunodeficiency virus (HIV) infection, Lyme disease, parotid tumor tumors, diabetes mellitus, and trauma to the facial nerve.'
    },
    {
      id: 'QuestionFive',
      text: '<p>A 55-year-old woman presents to the emergency room with a history of severe crushing retrosternal chest pain while she was moving some furniture around the house. Electrocardiography shows elevated ST segments in leads II, III, and aVF, consistent with an inferior myocardial infarction. This diagnosis is further supported by cardiac enzymes that test positive. The patient is hemodynamically stable. She is moved to the intensive care unit. A few hours later, she developed tachyarrhythmia. Treatment with intravenous (IV) boluses of lidocaine controls the arrhythmia only transiently\u2014the arrhythmia disappears within 1 minute only to reappear within 4 minutes of each bolus dose. Plasma levels of lidocaine measured soon after each injection remained within the therapeutic range (1\u20135 mg/L). Which of the following statements is most accurate?</p>',
      field: 'Medicine',
      options: [
        {
          alpha: 'a',
          text: 'Rapid metabolism of lidocaine is responsible for the short duration of its antiarrhythmic action after the bolus administration.',
          id: 'a'
        },
        {
          alpha: 'b',
          text: 'Laboratory determinations of blood levels of lidocaine after IV administration are frequently in error.',
          id: 'b'
        },
        {
          alpha: 'c',
          text: 'The elimination half-life of lidocaine is approximately 2 minutes.',
          id: 'c'
        },
        {
          alpha: 'd',
          text: 'Lidocaine rapidly redistributes from blood to other tissues.',
          id: 'd'
        },
        {
          alpha: 'e',
          text: 'Cardiac cells rapidly develop tachyphylaxis to lidocaine.',
          id: 'e'
        }
      ],
      correct_option_explanation:
        '<strong>The correct answer is 4.</strong><br>Rapid (but temporary) control of arrhythmia follows achievement of a therapeutic blood level of lidocaine. The temporary nature occurs because lidocaine rapidly redistributes from blood to other tissues. In this situation, the reappearance of the arrhythmia reflects the rapid distribution of lidocaine from the blood to highly perfused body tissues, resulting in a decrease in plasma concentration of the drug below therapeutic levels. A similar process, involving redistribution of thiopental from the brain to other highly perfused tissues, is responsible for termination of the anesthetic effects of the intravenous (IV) barbiturate.'
    }
  ]
}
