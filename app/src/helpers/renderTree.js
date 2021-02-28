import React from 'react';
import { Tree, TreeNode } from "react-organizational-chart";
import EmployeeCard from '../components/EmployeeCard';

const renderAllTreeNode = (nodes =[], renderItem, dubKey = '0') => {
    nodes = nodes.map((node, index) => {
        dubKey = `${dubKey}-${index}`;
        const { children } = node;
        if (children && children.length) {
            return (
                <TreeNode label={renderItem(node)} key={dubKey}>
                    {renderAllTreeNode(children,renderItem, dubKey)}
                </TreeNode>
            );
        } else {
            return <TreeNode children={renderItem(node)} key={dubKey} />;
        }
    });
    return nodes;
};

function renderTreeComponent(list, settings = {}) {

    if (Object.prototype.toString.call(list) === "[object Array]" && !list.length) {
        return "Sorry"
    }

    const root = list[0];
    list = root.children || [];

    const renderItem = settings.renderItem || "Noop";
    return <Tree className="org-chart" label={ renderItem(root) }>
                {
                    renderAllTreeNode(list, renderItem)
                }
            </Tree>        
}

export default renderTreeComponent;