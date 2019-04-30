import React from 'react'
import CardItem from 'midgard/components/CardItem/CardItem'

function ProductsCardItem({ layout, product, options, action }) {
  const title = { label: 'Product name', prop: 'name', value: product.name };
  const subText = { label: 'Product make', prop: 'make', value: product.make };
  const subText2 = { label: 'Product type', prop: 'type', value: product.type };
  const caption = { label: 'Ref', prop: 'reference_id', value: product.reference_id };
  const link = { label: 'Style', prop: 'style', value: product.style };
  const dateHeader1 = { label: 'Created', prop: 'create_date', value: product.create_date };
  const dateHeader2 = { label: 'Edited', prop: 'edit_date', value: product.edit_date };
  const details = { label: 'Model', prop: 'model', value: product.model };
  const description = { label: 'Description', prop: 'description', value: product.description };
  const tags = { label: 'Status', prop: 'status', value: product.status };

  const onChange = (event, uuid, payload) => {
    const product = {
      name: title.value,
      make: subText.value,
      type: subText2.value,
      reference_id: caption.value,
      style: link.value,
      model: details.value,
      description: description.value,
      status: tags.value,
      ...payload
    };
    action(event, uuid, product);
  }

  return (
    <CardItem
      id={product.uuid}
      layout={layout}
      title={title}
      subText={subText}
      subText2={subText2}
      caption={caption}
      link={link}
      dateHeader1={dateHeader1}
      dateHeader2={dateHeader2}
      details={details}
      description={description}
      tags={tags}
      options={options}
      action={onChange}>
    </CardItem>
  )
}

export default ProductsCardItem;