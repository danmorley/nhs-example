import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import Panel from './Panel';
import ImageUtils from '../../base/panels/ImageUtils';

/**
 *  Inline SVG Panel is a simple panel that can be used to
 *  insert some inline SVG together with associated styling
 *  and javascript to make the SVG interactive.
 *
 *  It expects the following properties:
 *  - content
 *
 *  content: {
 *    svg: 'let some.inline.javascript = true;',
 *    styles: '',
 *    script: 'let some.inline.javascript = true;'
 *  }
 *
 *  The script can either be provided inline, or by loading an external script.
 */
class InlineSvgPanel extends Component {
  componentDidMount() {
    let { id, content } = this.props;

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.id = id + '-script';
    s.innerHTML = content.script || '';

    if (this.instance) this.instance.appendChild(s);
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setImage);
  }

  handleResize() {
    this.forceUpdate(); // OK to use forceUpdate for a resize.
  }

  render() {
    let { content, classNamePrefix } = this.props;
    const svgCode = (ImageUtils.screenSize() === 'mobile' && content.svg_mob)? content.svg_mob : content.svg;

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix}>
        <style type="text/css" scoped={true} dangerouslySetInnerHTML={{__html: content.styles}} />
        <div className="svg-graphic" ref={el => (this.instance = el)} dangerouslySetInnerHTML={{__html: svgCode}} />
      </Panel>
    )
  }
}

InlineSvgPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
}

CmsComponentRegistry.register('inline_svg_panel', InlineSvgPanel, 'inline-svg-panel');

export default InlineSvgPanel;
