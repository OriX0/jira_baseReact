/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanbans";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表", false);
  const { data: currentProjectInfo } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <div>
      <h1>{currentProjectInfo?.name}看板</h1>
      <ColumnsContainer>
        {kanbans?.map((kanban) => {
          return <KanbanColumn key={kanban.id} kanban={kanban} />;
        })}
      </ColumnsContainer>
    </div>
  );
};
const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
