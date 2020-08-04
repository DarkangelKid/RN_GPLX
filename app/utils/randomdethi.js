import _ from 'lodash';

export const getRndIntegerB2 = () =>
  _.concat(
    _.sampleSize(_.range(1, 16), 1),
    _.sampleSize(_.range(17, 21), 2),
    _.sampleSize(_.range(22, 125), 7),
    _.sampleSize(_.range(167, 192), 1),
    _.sampleSize(_.range(193, 210), 1),
    _.sampleSize(_.range(215, 259), 2),
    _.sampleSize(_.range(270, 304), 1),
    _.sampleSize(_.range(305, 486), 10),
    _.sampleSize(_.range(487, 600), 10),
  );

export const getRndIntegerB1 = () => {
  var examQuestions = [];
  examQuestions = _.concat(
    _.sampleSize(_.range(1, 16), 1),
    _.sampleSize(_.range(17, 21), 2),
    _.sampleSize(_.range(22, 125), 6),
    _.sampleSize(_.range(193, 210), 1),
    _.sampleSize(_.range(215, 259), 1),
    _.sampleSize(_.range(270, 304), 1),
    _.sampleSize(_.range(305, 486), 9),
    _.sampleSize(_.range(487, 600), 9),
  );

  return examQuestions;
};
export const getRndIntegerC = () => {
  var examQuestions = [];
  examQuestions = _.concat(
    _.sampleSize(_.range(1, 16), 1),
    _.sampleSize(_.range(17, 21), 2),
    _.sampleSize(_.range(22, 125), 7),
    _.sampleSize(_.range(167, 192), 1),
    _.sampleSize(_.range(193, 210), 1),
    _.sampleSize(_.range(215, 259), 2),
    _.sampleSize(_.range(270, 304), 1),
    _.sampleSize(_.range(305, 486), 14),
    _.sampleSize(_.range(487, 600), 11),
  );

  return examQuestions;
};
export const getRndIntegerDEF = () => {
  var examQuestions = [];
  examQuestions = _.concat(
    _.sampleSize(_.range(1, 16), 1),
    _.sampleSize(_.range(17, 21), 2),
    _.sampleSize(_.range(22, 125), 7),
    _.sampleSize(_.range(167, 192), 1),
    _.sampleSize(_.range(193, 210), 1),
    _.sampleSize(_.range(215, 259), 2),
    _.sampleSize(_.range(270, 304), 1),
    _.sampleSize(_.range(305, 486), 16),
    _.sampleSize(_.range(487, 600), 14),
  );

  return examQuestions;
};
export const getRndIntegerA = () => {
  var examQuestions = [];
  examQuestions = _.concat(
    _.sampleSize(_.range(1, 16), 1),
    _.sampleSize(_.range(17, 21), 2),
    _.sampleSize(_.range(22, 125), 7),
    _.sampleSize(_.range(167, 192), 1),
    _.sampleSize(_.range(193, 210), 1),
    _.sampleSize(_.range(215, 259), 2),
    _.sampleSize(_.range(270, 304), 1),
    _.sampleSize(_.range(305, 486), 5),
    _.sampleSize(_.range(487, 600), 5),
  );

  return examQuestions;
};
