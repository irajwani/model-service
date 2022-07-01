import { IModel } from '../../../Schemas/model.schema';
import {
  CannotDeleteAllAttributesException,
  CannotDeleteAllEntitiesException,
  InvalidPathException,
  OperationPathMismatchException,
} from '../../../Common/Errors';
import BaseGenerator from './base-generator';
import { UpdateQuery } from 'mongoose';
import { ValidResources } from './Types/valid-resources';
import { isInteger } from '../../../Common/utils';

export default class DeleteQueryGenerator extends BaseGenerator {
  update: UpdateQuery<IModel>[] = [];

  constructor({ path, model }) {
    super();
    this.type = '$unset';
    this.path = path;
    this.value = '';
    this.pathComponents = this.generatePathComponents();
    this.model = model;
    this.field = this.generateField();
    this.generate();
  }

  generate() {
    const [property, index, subProperty, subIndex] = this.pathComponents;
    if (this.path === ValidResources.name)
      throw new OperationPathMismatchException();
    else if (this.path === ValidResources.entities)
      throw new CannotDeleteAllEntitiesException();
    else if (this.path === ValidResources.associations) {
      this.update.push({ [this.type]: { [this.field]: this.value } });
    } else if (
      property === ValidResources.entities &&
      isInteger(index) &&
      !subProperty
    ) {
      //  entities/n
      if (this.model.entities.length === 1)
        throw new CannotDeleteAllEntitiesException();

      if (!this.model.entities[index]) throw new InvalidPathException();

      const entityName = this.model.entities[index].name;
      this.update.push({ $pull: { [property]: { name: entityName } } });
      this.update.push({
        $pull: {
          [ValidResources.associations]: {
            $or: [{ source: entityName }, { target: entityName }],
          },
        },
      });
    } else if (
      property === ValidResources.entities &&
      isInteger(index) &&
      subProperty &&
      !subIndex
    ) {
      // entities/n/attributes
      throw new CannotDeleteAllAttributesException();
    } else if (
      property === ValidResources.entities &&
      isInteger(index) &&
      subProperty &&
      isInteger(subIndex)
    ) {
      // entities/n/attributes/k
      const attributes = this.model.entities[index].attributes;
      if (attributes.length === 1)
        throw new CannotDeleteAllAttributesException();
      if (!attributes[subIndex]) throw new InvalidPathException();
      this.update.push({
        $pull: {
          [`${property}.${index}.${subProperty}`]: {
            name: attributes[subIndex].name,
          },
        },
      });
    } else if (property === ValidResources.associations && isInteger(index)) {
      //  associations/n
      const association = this.model.associations[index];
      if (!association) throw new InvalidPathException();
      this.update.push({
        $pull: { [property]: { name: association.name } },
      });
    } else {
      throw new InvalidPathException();
    }
  }
}
