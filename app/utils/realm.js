import Realm from 'realm';

class Exam extends Realm.Object {}
Exam.schema = {
  name: 'Exam',
  primaryKey: 'id',
  properties: {
    id: 'int',
    license_id: 'int',
    exam_no: 'int',
    exam_details: 'ExamDetail[]',
    rights_count: 'int',
    wrongs_count: 'int',
    no_answers_count: 'int',
    totalTime: 'int',
    testResult: 'int',
    status: 'int',
  },
};

class ExamDetail extends Realm.Object {}
ExamDetail.schema = {
  name: 'ExamDetail',
  primaryKey: 'id',
  properties: {
    id: 'int',
    exam_id: 'int',
    question: 'Question',
    selected_answer: 'int',
  },
};

class Question extends Realm.Object {}
Question.schema = {
  name: 'Question',
  primaryKey: 'id',
  properties: {
    id: 'int',
    type: {type: 'int', indexed: true},
    content: 'string',
    answer1: 'string',
    answer2: 'string',
    answer3: 'string',
    answer4: 'string',
    image_file: 'string',
    right_answer: 'int',
    right_required: 'int',
    a1_no: 'int',
    a2_no: 'int',
    a3_no: 'int',
    a4_no: 'int',
    b1_no: 'int',
    b2_no: 'int',
    c_no: 'int',
    def_no: 'int',
    rights_count: 'int',
    wrongs_count: 'int',
    hint: 'string',
  },
};

export default new Realm({schema: [Exam.schema, ExamDetail.schema, Question.schema]});
