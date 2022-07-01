import * as _ from 'lodash';
import { IModel } from '../../../Schemas/model.schema';
import {
  InvalidAssociationException,
  InvalidPathException,
  OperationPathMismatchException,
} from '../../../Common/Errors';
import BaseGenerator from './base-generator';
import { UpdateQuery } from 'mongoose';
import { ValidProperties, ValidResources } from './Types/valid-resources';
import { isInteger } from '../../../Common/utils';
import { IEntity } from '../Types/entity';
import { IAssociation } from '../Types/association';

export default class EditQueryGenerator extends BaseGenerator {
  update: UpdateQuery<IModel>[] = [];

  constructor({ path, value, model }) {
    super();
    this.type = '$set';
    this.path = path;
    this.value = value;
    this.pathComponents = this.generatePathComponents();
    this.model = model;
    this.field = this.generateField();
    this.generate();
  }

  generate() {
    const [property, index, subProperty, subIndex, attributeProperty] =
      this.pathComponents;
    if (this.path === ValidResources.name) {
    } else if (
      this.path === ValidResources.entities ||
      this.path === ValidResources.associations
    ) {
      throw new OperationPathMismatchException();
    } else if (
      property === ValidResources.entities &&
      isInteger(index) &&
      !subProperty
    ) {
      //  entities/n
      const entity = this.value as IEntity;
      if (!this.model.entities[index]) throw new InvalidPathException();

      const entityName = this.model.entities[index].name;
      if (entity.name !== entityName) {
        this.update.push({
          $pull: {
            [ValidResources.associations]: {
              $or: [{ source: entityName }, { target: entityName }],
            },
          },
        });
      }
    } else if (
      property === ValidResources.entities &&
      isInteger(index) &&
      subProperty &&
      !subIndex
    ) {
      // entities/n/attributes
      if (!this.model.entities[index].attributes)
        throw new InvalidPathException();
    } else if (
      property === ValidResources.entities &&
      isInteger(index) &&
      subProperty &&
      isInteger(subIndex) &&
      !attributeProperty
    ) {
      // entities/n/attributes/k
      if (!this.model.entities[index].attributes[subIndex])
        throw new InvalidPathException();
    } else if (
      property === ValidResources.entities &&
      isInteger(index) &&
      subProperty &&
      isInteger(subIndex) &&
      attributeProperty
    ) {
      // entities/n/attributes/k/property
      if (
        !this.model.entities[index].attributes[subIndex] ||
        (attributeProperty !== ValidProperties.name &&
          attributeProperty !== ValidProperties.type)
      )
        throw new InvalidPathException();
    } else if (
      property === ValidResources.associations &&
      isInteger(index) &&
      !subProperty
    ) {
      //  associations/n
      if (!this.model.associations[index]) throw new InvalidPathException();
      const { source, target } = this.value as IAssociation;
      if (
        !this.model.entities.find(
          (entity) => entity.name === source || entity.name === target,
        ) ||
        source === target
      )
        throw new InvalidAssociationException();
    } else if (
      property === ValidResources.associations &&
      isInteger(index) &&
      subProperty
    ) {
      // associations/n/[name or source or target]
      const { source, target } = this.model.associations[index];
      if (
        subProperty === ValidProperties.source ||
        subProperty === ValidProperties.target
      ) {
        if (
          !this.model.entities.find((entity) => entity.name === this.value) ||
          (subProperty === ValidProperties.source && this.value === source) ||
          (subProperty === ValidProperties.target && this.value === target)
        )
          throw new InvalidAssociationException();

        const entityIndices: number[] = [];
        _.forEach(this.model.entities, (entity: IEntity, index) => {
          if (entity.name === this.value) entityIndices.push(index);
        });
        _.forEach(entityIndices, (index) => {
          this.update.push({
            [this.type]: { [`entities.${index}.name`]: this.value },
          });
        });
      }
    }

    this.update.push({
      [this.type]: { [this.field]: this.value },
    });
  }
}
