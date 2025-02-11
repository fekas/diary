import { FC, useState, useEffect } from 'react'
import { Calendar, Badge, Modal, List, Tag, Button, Form, Input, Select, message } from 'antd'
import type { Dayjs } from 'dayjs'
import { getDiaries, createDiary, updateDiary, deleteDiary, DiaryEntry } from '../../services/diary'
import './style.css'

const DiaryCalendar: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null)
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [form] = Form.useForm()
  // 获取日记列表
  const fetchDiaries = async () => {
    try {
      const data = await getDiaries();
      setDiaryEntries(data);
    } catch (error) {
      message.error('获取日记列表失败');
    }
  };
  useEffect(() => {
    fetchDiaries();
  }, []);
  const dateCellRender = (date: Dayjs) => {
    const entries = diaryEntries.filter(
      entry => entry.date === date.format('YYYY-MM-DD')
    )
    return (
      <div className="diary-cell">
        {entries.map(entry => (
          <Badge
            key={entry.id}
            status="success"
            text={entry.title}
            className="diary-badge"
          />
        ))}
      </div>
    )
  }
  const handleDateSelect = (date: Dayjs, { source }: { source?: string }) => {
    if (source === 'date') {
      setSelectedDate(date)
      setIsModalVisible(true)
    }
  }
  const handleModalClose = () => {
    try {
      setIsModalVisible(false)
      setSelectedDate(null)
      setIsEditMode(false);
      setEditingEntry(null);
      form.resetFields();
    } catch (error) {
      message.error('操作失败');
    }
  }
  const handleCreateDiary = () => {
    setIsEditMode(true)
    setEditingEntry(null)
    form.resetFields()
  }
  const handleEditDiary = (entry: DiaryEntry) => {
    setIsEditMode(true)
    setEditingEntry(entry)
    form.setFieldsValue(entry)
  }
  const handleDeleteDiary = async (id: string) => {
    try {
      await deleteDiary(id);
      message.success('删除成功');
      fetchDiaries();
    } catch (error) {
      message.error('删除失败');
    }
  }
  const handleSubmit = async (values: any) => {
    try {
    if (editingEntry) {
      // 编辑现有日记
      await updateDiary(editingEntry.id, values);
      message.success('更新成功');
      fetchDiaries()
    } else {
      // 创建新日记
      await createDiary({
        date: selectedDate!.format('YYYY-MM-DD'),
        ...values
      });
      message.success('创建成功');
      fetchDiaries()
    }
      setIsEditMode(false);
      setEditingEntry(null);
      form.resetFields();
    } catch (error) {
      message.error('操作失败');
    }
  }
  return (
    <div className="calendar-container">
      <Calendar
        className="diary-calendar"
        cellRender={dateCellRender}
        onSelect={handleDateSelect}
      />
      <Modal
        title={selectedDate?.format('YYYY年MM月DD日') + ' 的日记'}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {!isEditMode ? (
          <>
            <Button type="primary" onClick={handleCreateDiary} style={{ marginBottom: 16 }}>
              写新日记
            </Button>
            <List
              dataSource={selectedDate
                ? diaryEntries.filter(
                    entry => entry.date === selectedDate.format('YYYY-MM-DD')
                  )
                : []}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button key="edit" type="link" onClick={() => handleEditDiary(item)}>
                      编辑
                    </Button>,
                    <Button key="delete" type="link" danger onClick={() => handleDeleteDiary(item.id)}>
                      删除
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <div>
                        <p>{item.content}</p>
                        <div>
                          {item.tags.map(tag => (
                            <Tag key={tag} color="blue">{tag}</Tag>
                          ))}
                          <Tag color="green">{item.mood}</Tag>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="title"
              label="标题"
              rules={[{ required: true, message: '请输入日记标题' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="content"
              label="内容"
              rules={[{ required: true, message: '请输入日记内容' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="tags"
              label="标签"
              rules={[{ required: true, message: '请选择标签' }]}
            >
              <Select
                mode="tags"
                placeholder="请输入或选择标签"
                options={[
                  { value: '心情', label: '心情' },
                  { value: '工作', label: '工作' },
                  { value: '学习', label: '学习' },
                  { value: '日常', label: '日常' }
                ]}
              />
            </Form.Item>
            <Form.Item
              name="mood"
              label="心情"
              rules={[{ required: true, message: '请选择心情' }]}
            >
              <Select
                placeholder="请选择心情"
                options={[
                  { value: '开心', label: '开心' },
                  { value: '平静', label: '平静' },
                  { value: '难过', label: '难过' },
                  { value: '充实', label: '充实' }
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingEntry ? '保存' : '创建'}
              </Button>
              <Button onClick={() => setIsEditMode(false)} style={{ marginLeft: 8 }}>
                取消
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  )
}

export default DiaryCalendar;
