// if removing an entity, make sure to remove all associations
import * as _ from 'lodash';
import { IModel } from '../../../Schemas/model.schema';
import { Operations } from '../Types/patch';
import { IEntity } from '../Types/entity';
import {
  AssociationExistsException,
  AttributeExistsException,
  CannotDeleteAllEntitiesException,
  EntityExistsException,
  InvalidAssociationException,
  InvalidAttributeException,
  InvalidPathException,
  OperationPathMismatchException,
} from '../../../Common/Errors';
import BaseGenerator from './base-generator';
import { TValue } from './Types/value';
import { IAssociation } from '../Types/association';
import { IAttribute } from '../Types/attribute';
import { UpdateQuery } from 'mongoose';
import { ValidResources } from './Types/valid-resources';

export default class DeleteQueryGenerator extends BaseGenerator {
  constructor({ path, model }) {
    super();
    this.type = '$unset';
    this.path = path;
    this.model = model;
    this.field = this.generateField();
    this.update = this.generate();
  }

  validateEntity() {
    // make sure this.value is of the right shape

    const entity = this.value as IEntity;
    if (
      this.model.entities.includes(entity) ||
      this.model.entities.find((e) => e.name === entity.name)
    )
      throw new EntityExistsException();
    return;
  }

  validateAssociation() {
    const association = this.value as IAssociation;
    const { name, source, target } = association;
    // same thing for associations
    if (
      this.model.associations.includes(association) ||
      this.model.associations.find((a) => a.name === name)
    )
      throw new AssociationExistsException();

    if (
      !this.model.entities.find(
        (entity) => entity.name === source || entity.name === target,
      ) ||
      source === target
    )
      throw new InvalidAssociationException();
    return;
  }

  validateAttribute() {
    const [property, index, subProperty] = _.split(this.path, '/');
    if (
      !this.model[property][index] ||
      !this.model[property][index][subProperty]
    ) {
      throw new InvalidPathException();
    }

    // check if attribute has right shape

    const attribute = this.value as IAttribute;
    // check if attribute already exists
    if (
      this.model.entities[index].attributes.find(
        (a) => a.name === attribute.name,
      )
    )
      throw new AttributeExistsException();
    return;
  }

  validatePath(): void {
    const [property, index, subProperty, subIndex] = _.split(this.path, '/');
    if (property && index && subProperty && subIndex) {
      // if (property !== ValidResources.entities) throw new
    }
  }

  validate() {
    this.validatePath();
    if (this.path === 'name') throw new OperationPathMismatchException();
    if (this.path === 'entities') throw new CannotDeleteAllEntitiesException();
    else if (this.path === 'associations') {
      return;
    } else {
      this.validateAttribute();
    }
  }

  generate(): UpdateQuery<IModel> {
    this.validate();
    return {
      [this.type]: { [this.field]: '' },
    };
  }
}
