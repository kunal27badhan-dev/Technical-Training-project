const { rankItems } = require('../utils/rankItems');

describe('rankItems', () => {
  test('sorts items by score in descending order', () => {
    const mockItems = [
      { id: 1, title: 'Low', score: 10, date: '2024-01-01' },
      { id: 2, title: 'High', score: 100, date: '2024-01-02' },
      { id: 3, title: 'Medium', score: 50, date: '2024-01-03' }
    ];
    
    const result = rankItems(mockItems);
    
    expect(result[0].score).toBe(100);
    expect(result[1].score).toBe(50);
    expect(result[2].score).toBe(10);
  });
  
  test('returns only top N items', () => {
    const mockItems = [
      { id: 1, title: 'Item 1', score: 100, date: '2024-01-01' },
      { id: 2, title: 'Item 2', score: 90, date: '2024-01-02' },
      { id: 3, title: 'Item 3', score: 80, date: '2024-01-03' },
      { id: 4, title: 'Item 4', score: 70, date: '2024-01-04' },
      { id: 5, title: 'Item 5', score: 60, date: '2024-01-05' }
    ];
    
    const result = rankItems(mockItems, 3);
    
    expect(result).toHaveLength(3);
    expect(result[0].score).toBe(100);
    expect(result[2].score).toBe(80);
  });
  
  test('handles topN larger than array length', () => {
    const mockItems = [
      { id: 1, title: 'Item 1', score: 100, date: '2024-01-01' },
      { id: 2, title: 'Item 2', score: 50, date: '2024-01-02' }
    ];
    
    const result = rankItems(mockItems, 10);
    
    expect(result).toHaveLength(2);
  });
  
  test('uses default topN of 10', () => {
    const mockItems = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `Item ${i + 1}`,
      score: 100 - i,
      date: '2024-01-01'
    }));
    
    const result = rankItems(mockItems);
    
    expect(result).toHaveLength(10);
  });
  
  test('maintains correct order with equal scores', () => {
    const mockItems = [
      { id: 1, title: 'First', score: 50, date: '2024-01-01' },
      { id: 2, title: 'Second', score: 50, date: '2024-01-02' },
      { id: 3, title: 'Third', score: 50, date: '2024-01-03' }
    ];
    
    const result = rankItems(mockItems);
    
    expect(result).toHaveLength(3);
    expect(result.every(item => item.score === 50)).toBe(true);
  });
  
  test('returns empty array for empty input', () => {
    expect(rankItems([])).toEqual([]);
    expect(rankItems(null)).toEqual([]);
    expect(rankItems(undefined)).toEqual([]);
  });
  
  test('handles single item', () => {
    const mockItems = [
      { id: 1, title: 'Only', score: 75, date: '2024-01-01' }
    ];
    
    const result = rankItems(mockItems, 5);
    
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });
  
  test('preserves all item properties', () => {
    const mockItems = [
      { id: 1, title: 'Item', score: 100, date: '2024-01-01', extra: 'data' },
      { id: 2, title: 'Item', score: 50, date: '2024-01-02', extra: 'more' }
    ];
    
    const result = rankItems(mockItems);
    
    expect(result[0].extra).toBe('data');
    expect(result[1].extra).toBe('more');
  });
});
