import { Operations } from '../Types/patch';
import { AddEntityStrategy } from './Add/entity';
import { AddAttributeStrategy } from './Add/attribute';
import { AddAssociationStrategy } from './Add/association';
import { DeleteAssociationsStrategy } from './Delete/associations';
import { DeleteEntityStrategy } from './Delete/entity';
import { DeleteAssociationStrategy } from './Delete/association';
import { DeleteAttributeStrategy } from './Delete/attribute';
import { EditNameStrategy } from './Edit/name';
import { EditEntityStrategy } from './Edit/entity';
import { EditEntityNameStrategy } from './Edit/entity-name';
import { EditEntityAttributesStrategy } from './Edit/entity-attributes';
import { EditEntityAttributePropertyStrategy } from './Edit/entity-attribute-property';
import { EditAssociationStrategy } from './Edit/association';
import { EditAssociationPropertyStrategy } from './Edit/association-property';

export const QueryGenerators = {
  [Operations.ADD]: {
    ['entities']: AddEntityStrategy,
    ['entities.n.attributes']: AddAttributeStrategy,
    ['associations']: AddAssociationStrategy,
  },
  [Operations.DELETE]: {
    ['entities.n']: DeleteEntityStrategy,
    ['entities.n.attributes.n']: DeleteAttributeStrategy,
    ['associations']: DeleteAssociationsStrategy,
    ['associations.n']: DeleteAssociationStrategy,
  },
  [Operations.EDIT]: {
    ['name']: EditNameStrategy,
    ['entities.n.name']: EditEntityNameStrategy,
    ['entities.n.attributes']: EditEntityAttributesStrategy,
    ['entities.n.attributes.n.sub-property']:
      EditEntityAttributePropertyStrategy,
    ['associations.n']: EditAssociationStrategy,
    ['associations.n.sub-property']: EditAssociationPropertyStrategy,
  },
};
