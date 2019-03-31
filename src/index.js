import React, {Component} from 'react';
import PropTypes from "prop-types";
import { debounce } from './utils';

import './index.css';

export default class EllipsisTooltip extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            showTooltip: false,
        };
        this.onResize = this.onResize.bind(this);
        this.onResize = debounce( this.onResize, 300);
        this.setTooltipVisibility = this.setTooltipVisibility.bind(this);
    }

    componentDidMount() {
        this.setTooltipVisibility();
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize() {
        this.setTooltipVisibility();
    }

    setTooltipVisibility() {
        const { tooltip, isMultilineEllipsis } = this.props;
        let offsetDimension, scrollDimension;

        if(this.childElmRef) {
            if( isMultilineEllipsis ) {
                offsetDimension = this.childElmRef.offsetHeight;
                scrollDimension = this.childElmRef.scrollHeight;
            }
            else {
                offsetDimension = this.childElmRef.offsetWidth;
                scrollDimension = this.childElmRef.scrollWidth;
            }
        }

        if( offsetDimension < scrollDimension && tooltip ) {
            this.setState({
                showTooltip: true
            });
        }
        else {
            this.setState({
                showTooltip: false
            });
        }
    }

    render() {
        const { children, tooltip, isMultilineEllipsis, lineHeight, lineCount } = this.props;
        const childrenClassName = children.props.className ? children.props.className : '';
        const { showTooltip } = this.state;
        
        const elementClassName = isMultilineEllipsis ? 'multiline-ellipsis-text' : 'ellipsis-text';
        const ellipsisClassName = isMultilineEllipsis ? 'pseudo-ellipsis-element' : 'ellipsis-text-overflow';
        const styleObj = isMultilineEllipsis ? { lineHeight: `${lineHeight}rem`, maxHeight: `${lineHeight * lineCount}rem`} : {};

        if( showTooltip ) {
            return React.cloneElement(children, {
                ref : node => this.childElmRef = node,
                className: `${childrenClassName} ${elementClassName} ${ellipsisClassName}`,
                style: styleObj,
                title: tooltip
            });
        }
        else {
            return React.cloneElement(children, {
                ref : node => this.childElmRef = node,
                className: `${childrenClassName} ${elementClassName}`,
                style: styleObj
            });
        }
    }
}

EllipsisTooltip.defaultProps = {
    tooltip: '',
    placement: 'auto',
    isMultilineEllipsis: false,
    lineCount: 2,
    lineHeight: 1.2
};

EllipsisTooltip.propTypes = {
    isMultilineEllipsis: PropTypes.bool, /** This is indicate if we want to set multiline ellipsis */
    lineCount: PropTypes.number, /** If `isMultilineEllipsis` is set to `true`, by using this prop you can indicate after how many lines you want the ellipsis */
    lineHeight: PropTypes.number, /** In case of Multiline ellipsis, you can define height of a single line using this prop */
    tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.number]).isRequired, /** You can pass tooltip message using this prop */
    placement: PropTypes.oneOf([
        'auto',
        'top',
        'right',
        'bottom',
        'left',
    ]), /** Tooltip position */
    children: PropTypes.element.isRequired,
    tooltipComponent: PropTypes.any /** If you want to use any other tooltip component, you can pass it here. Constraint: it must accept `tooltip` and `placement` prop */
};