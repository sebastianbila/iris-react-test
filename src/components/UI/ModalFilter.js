import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'antd/lib/date-picker'
import Form from 'antd/lib/form'
import Modal from 'antd/lib/modal'
import Select from 'antd/lib/select'

ModalFilter.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  changeParams: PropTypes.func.isRequired
}

function ModalFilter(props) {
  const {show, close, changeParams} = props

  const [order, setOrder] = useState('')
  const [sort, setSort] = useState('')
  const [date, setDate] = useState({fromDate: 0, toDate: 0})

  const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 16},
    layout: 'horizontal',
    size: 'large'
  }

  const getDate = (from, e) => {
    if (e) {
      setDate({
        ...date,
        [from]: Math.floor(Date.parse(e.format()) / 1000)
      })
    }
  }

  const handleConfirm = () => {
    const params = {
      order, sort,
      fromDate: date.fromDate || '',
      toDate: date.toDate || ''
    }

    changeParams(params)
    close()
  }

  return (
    <Modal
      title="Filter"
      visible={ show }
      onOk={ handleConfirm }
      onCancel={ close }
    >
      <Form { ...layout } >
        {/* Order */ }
        <Form.Item label="Order">
          <Select onChange={ setOrder } value='desc'>
            <Select.Option value="desc">Descending</Select.Option>
            <Select.Option value="asc">Ascending</Select.Option>
          </Select>
        </Form.Item>

        {/* Sort */}
        <Form.Item label="Sort">
          <Select onChange={setSort} value='activity'>
            <Select.Option value="activity">Activity</Select.Option>
            <Select.Option value="votes">Votes</Select.Option>
            <Select.Option value="creation">Creation</Select.Option>
            <Select.Option value="hot">Hot</Select.Option>
            <Select.Option value="week">Week</Select.Option>
            <Select.Option value="month">Month</Select.Option>
          </Select>
        </Form.Item>


        {/* From date*/}
        <Form.Item label="From date">
          <DatePicker
            style={{width: '100%'}}
            onChange={getDate.bind(this, 'fromDate')}
          />
        </Form.Item>

        {/* To Date */}
        <Form.Item label="To date">
          <DatePicker
            style={{width: '100%'}}
            onChange={getDate.bind(this, 'toDate')}
          />
        </Form.Item>


      </Form>
    </Modal>
  )
}

export default ModalFilter
