from django.template.loader import render_to_string
from django.utils.safestring import mark_safe
from django.core.exceptions import NON_FIELD_ERRORS

from wagtail.core.blocks.base import Block
from wagtail.core.blocks.stream_block import StreamBlock, StreamValue
from wagtail.core.utils import escape_script


class ExpandedStreamBlock(StreamBlock):

    def __init__(self, local_blocks=None, **kwargs):
        super(ExpandedStreamBlock, self).__init__(local_blocks, **kwargs)

        self.order_blocks = []
        if local_blocks:
            for name, block in local_blocks:
                self.order_blocks.append(name)

    def render_list_member(self, block_type_name, value, prefix, index, errors=None, id=None):
        """
        Render the HTML for a single list item. This consists of an <li> wrapper, hidden fields
        to manage ID/deleted state/type, delete/reorder buttons, and the child block's own HTML.
        """
        child_block = self.child_blocks[block_type_name]
        child = child_block.bind(value, prefix="%s-value" % prefix, errors=errors)
        return render_to_string('wagtailadmin/block_forms/expanded_stream_member.html', {
            'child_blocks': self.sorted_child_blocks(),
            'block_type_name': block_type_name,
            'prefix': prefix,
            'child': child,
            'index': index,
            'block_id': id,
        })

    def render_form(self, value, prefix='', errors=None):
        error_dict = {}
        if errors:
            if len(errors) > 1:
                # We rely on StreamBlock.clean throwing a single
                # StreamBlockValidationError with a specially crafted 'params'
                # attribute that we can pull apart and distribute to the child
                # blocks
                raise TypeError('StreamBlock.render_form unexpectedly received multiple errors')
            error_dict = errors.as_data()[0].params

        # value can be None when the StreamField is in a formset
        if value is None:
            value = self.get_default()
        # drop any child values that are an unrecognised block type
        valid_children = [child for child in value if child.block_type in self.child_blocks]

        list_members_html = []
        index = 0
        index_valid_children = 0
        for order_block in self.order_blocks:
            if index_valid_children < len(valid_children) and valid_children[index_valid_children].block_type == order_block:
                list_members_html.append(
                    self.render_list_member(valid_children[index_valid_children].block_type, valid_children[index_valid_children].value, "%s-%d" % ('block', index), index,
                                            errors=error_dict.get(index_valid_children), id=valid_children[index_valid_children].id)
                )
                index_valid_children += 1
            else:
                list_members_html.append(
                    self.render_list_member(order_block, self.child_blocks[order_block].get_default(), "%s-%d" % ('block', index), index)
                )
            index += 1

        return render_to_string('wagtailadmin/block_forms/expanded_stream.html', {
            'prefix': 'block',
            'list_members_html': list_members_html,
            'child_blocks': self.sorted_child_blocks(),
            'header_menu_prefix': '%s-before' % prefix,
            'block_errors': error_dict.get(NON_FIELD_ERRORS),
        })


    def value_from_datadict(self, data, files, prefix):
        return super(ExpandedStreamBlock, self).value_from_datadict(data, files, 'block')