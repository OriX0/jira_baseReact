/*
 * @Description: 触摸动态显示的弹出框
 * @Author: OriX
 * @LastEditors: OriX
 */
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/useProject";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "screens/project-list/utils";

export const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type={"link"}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;