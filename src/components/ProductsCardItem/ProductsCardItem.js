import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { colors } from 'colors'
import { rem } from 'polished'
import FjCardItem from 'ui-components/CardItem/CardItem'
import { Button } from 'ui-components/Button/Button'
import Menu from 'midgard/components/Menu/Menu'
import EditableLabel from 'react-inline-editing'
import logo from 'assets/midgard-logo.svg'

const ProductsCardItemWrapper = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  width: 100%;

  .card {
    &__row {
      display: flex;
      flex-direction: row;
    }

    &__column {
      &--flex {
        flex: 1;
      }
    }

    &__field {
      margin: ${rem(4)};

      &--primary {
        font-weight: bold;
      }

      &--secondary {
        color: ${colors.grayMediumDarker};
        font-size: ${rem(15)};
      }
    }

    &__small {
      margin: ${rem(4)};
      font-size: ${rem(12)};
      color: ${colors.grayMediumDarker};
    }

    &__input {
      font-size: ${rem(14)};
      height: 100%;
      width: 100%;
    }

    &__image {
      padding: 0 ${rem(10)};
      height: ${rem(80)};
      width: ${rem(80)};
      flex: none;

      img {
        max-width: 100%;
      }
    }

    &__options {
      padding: 0 ${rem(10)};
      flex: none;
      display: flex;
      align-items: center;
    }
  }

  label {
    word-break: break-all;

    &:empty {
      &::before {
        content: 'Click to add text';
        color: ${colors.grayMedium};
      }
    }
  }

  ${props => props.layout === 'list' && css`
    min-width: 100%;
  `}

  ${props => props.layout === 'tile' && css`
    max-width: ${rem(320)};

    .card {
      &__row {
        flex-direction: column;
      }

      &__image {
        display: flex;
        margin: auto;
      }

      &__options {
        justify-content: flex-end;
      }
    }
  `}

  ${props => props.disabled && css`
    opacity: 0.5;
    pointer-events: none;
  `}
`

function ProductsCardItem({id, options, menuItems}) {
  const [menuOpened, toggleMenu] = useState(false);

  const update = (id, action, label, value) => {
    action('update', { [label]: value, id });
  }

  /**
   * Selects an action from the options menu.
   * @param {string} action the selected action.
   */
  const selectAction = (id, event, action) => {
    action(event, { id });
  }

  const dateOptions = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  };
  const createDate = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(options.create_date));
  const editDate = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(options.edit_date));
  
  return (
    <ProductsCardItemWrapper
      layout={options.layout}
      disabled={options.disabled}>
      <FjCardItem
        content={
        <React.Fragment>
          <div className="card__small">Created on {createDate} | Edited on {editDate}</div>
          <div className="card__row">
            <div className="card__column card__column--flex">
              <div 
                onClick={(event) => event.stopPropagation()}
                className="card__field card__field--secondary">
                <EditableLabel
                  inputPlaceHolder="Enter model"
                  inputClassName="card__input"
                  text={options.model}
                  onFocusOut={(event) => update(id, options.action, 'model', event)} />
              </div>
              <div 
                onClick={(event) => event.stopPropagation()}
                className="card__field card__field--secondary">
                <EditableLabel
                  inputPlaceHolder="Enter description"
                  inputClassName="card__input"
                  text={options.description}
                  onFocusOut={(event) => update(id, options.action, 'description', event)} />
              </div>
            </div>
            <div className="card__column card__column--flex">
              <div 
                onClick={(event) => event.stopPropagation()}
                className="card__field card__field--secondary">
                <EditableLabel
                  inputPlaceHolder="Enter status"
                  inputClassName="card__input"
                  text={options.status}
                  onFocusOut={(event) => update(id, options.action, 'status', event)} />
              </div>
            </div>
          </div>
        </React.Fragment>}>
        <div className="card__header">
          <div className="card__row">
            <div className="card__column">
              <div className="card__image" onClick={(event) => event.stopPropagation()}>
                <img src={options.file || logo} />
              </div>
            </div>
            <div className="card__column card__column--flex">
              <div 
                onClick={(event) => event.stopPropagation()}
                className="card__field card__field--primary">
                <EditableLabel
                  inputPlaceHolder="Enter name"
                  inputClassName="card__input"
                  text={options.name}
                  onFocusOut={(event) => update(id, options.action, 'name', event)} />
              </div>
              <div 
                onClick={(event) => event.stopPropagation()}
                className="card__field card__field--secondary">
                <EditableLabel
                  inputPlaceHolder="Enter make"
                  inputClassName="card__input"
                  text={options.make}
                  onFocusOut={(event) => update(id, options.action, 'make', event)} />
              </div>
              <div 
                onClick={(event) => event.stopPropagation()}
                className="card__field card__field--secondary">
                <EditableLabel
                  inputPlaceHolder="Enter type"
                  inputClassName="card__input"
                  text={options.type}
                  onFocusOut={(event) => update(id, options.action, 'type', event)} />
              </div>
            </div>
            <div className="card__column card__column--flex">
              <div 
                onClick={(event) => event.stopPropagation()}
                className="card__field card__field--secondary">
                <EditableLabel
                  inputPlaceHolder="Enter ref"
                  inputClassName="card__input"
                  text={options.reference_id}
                  onFocusOut={(event) => update(id, options.action, 'reference_id', event)} />
              </div>
              <div 
                onClick={(event) => event.stopPropagation()}
                className="card__field card__field--secondary">
                <EditableLabel
                  inputPlaceHolder="Enter style"
                  inputClassName="card__input"
                  text={options.style}
                  onFocusOut={(event) => update(id, options.action, 'style', event)} />
              </div>
            </div>
            <div className="card__column">
              <div 
                onClick={(event) => event.stopPropagation()}
                className="card__options">
                <Menu xPosition="right" yPosition="center" open={menuOpened} setOpen={toggleMenu} onActionClicked={(event) => selectAction(id, event, options.action)} menuItems={menuItems}>
                  <Button secondary small onClick={() => toggleMenu(!menuOpened)}>...</Button>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </FjCardItem>
    </ProductsCardItemWrapper>
  )
}

export default ProductsCardItem;