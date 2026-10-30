type FieldType = {
  id: string;
  name: string;
};

export const selectObjectConverter = (field: FieldType[]) => {
  return field.map((element: FieldType) => ({
    value: element.name,
    label: element.name,
  }));
};
