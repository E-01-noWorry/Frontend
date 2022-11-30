const colorFromPoint = (point) => {
  if (0 <= point && point <= 10) {
    return "White";
  } else if (11 <= point && point <= 25) {
    return "Yellow";
  } else if (26 <= point && point <= 50) {
    return "Green";
  } else if (51 <= point && point <= 100) {
    return "Blue";
  } else if (101 <= point) {
    return "Purple";
  }
};

const remainedPoint = (point) => {
  if (0 <= point && point <= 10) {
    return 11 - point;
  } else if (11 <= point && point <= 25) {
    return 26 - point;
  } else if (26 <= point && point <= 50) {
    return 51 - point;
  } else if (51 <= point && point <= 100) {
    return 101 - point;
  } else {
    return "-";
  }
};

export { colorFromPoint, remainedPoint };
